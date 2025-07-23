import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
import type { City } from '../data/cities';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
    isFromCache: boolean;
}

interface DataFetcherProps {
    city: City;
    cacheTimeMinutes?: number; // Tiempo de vida del cache en minutos (default: 15)
}

interface CachedData {
    data: OpenMeteoResponse;
    timestamp: number;
    cityKey: string;
}

export default function DataFetcherWithCache({ city, cacheTimeMinutes = 15 }: DataFetcherProps): DataFetcherOutput {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFromCache, setIsFromCache] = useState(false);

    // Generar clave única para cada ciudad
    const generateCacheKey = (city: City): string => {
        return `weather_cache_${city.name}_${city.latitude}_${city.longitude}`;
    };

    // Verificar si los datos en cache son válidos
    const isCacheValid = (cachedData: CachedData, cacheTimeMinutes: number): boolean => {
        const now = Date.now();
        const cacheAge = now - cachedData.timestamp;
        const maxAge = cacheTimeMinutes * 60 * 1000; // Convertir minutos a milisegundos
        
        return cacheAge < maxAge;
    };

    // Obtener datos del localStorage
    const getCachedData = (cacheKey: string): CachedData | null => {
        try {
            const cachedItem = localStorage.getItem(cacheKey);
            if (cachedItem) {
                const parsed: CachedData = JSON.parse(cachedItem);
                return parsed;
            }
        } catch (error) {
            console.warn('Error al leer datos del cache:', error);
            // Si hay error al leer, eliminar el item corrupto
            localStorage.removeItem(cacheKey);
        }
        return null;
    };

    // Guardar datos en localStorage
    const setCachedData = (cacheKey: string, data: OpenMeteoResponse, city: City): void => {
        try {
            const cacheItem: CachedData = {
                data,
                timestamp: Date.now(),
                cityKey: `${city.name}_${city.latitude}_${city.longitude}`
            };
            
            localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
            console.log(`✅ Datos guardados en cache para ${city.name}`);
        } catch (error) {
            console.warn('Error al guardar datos en cache:', error);
            // Si localStorage está lleno, limpiar cache antiguo
            cleanOldCache();
        }
    };

    // Limpiar cache antiguo para liberar espacio
    const cleanOldCache = (): void => {
        try {
            const keysToRemove: string[] = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('weather_cache_')) {
                    const cachedData = getCachedData(key);
                    if (cachedData && !isCacheValid(cachedData, cacheTimeMinutes)) {
                        keysToRemove.push(key);
                    }
                }
            }
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
                console.log(`🗑️ Cache expirado eliminado: ${key}`);
            });
            
        } catch (error) {
            console.warn('Error al limpiar cache antiguo:', error);
        }
    };

    // Realizar petición a la API
    const fetchFromAPI = async (url: string, cacheKey: string): Promise<void> => {
        try {
            console.log(`Obteniendo datos frescos de API para ${city.name}...`);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }

            const result: OpenMeteoResponse = await response.json();
            
            // Guardar en cache después de obtener datos exitosamente
            setCachedData(cacheKey, result, city);
            
            setData(result);
            setIsFromCache(false);
            setError(null);
            
        } catch (err: any) {
            console.error('Error al obtener datos de API:', err);
            
            // Intentar usar datos del cache como fallback, incluso si están expirados
            const cacheKey = generateCacheKey(city);
            const cachedData = getCachedData(cacheKey);
            
            if (cachedData) {
                console.log(`Usando datos del cache como fallback para ${city.name}`);
                setData(cachedData.data);
                setIsFromCache(true);
                setError(`Error de red - Mostrando datos del cache (${Math.round((Date.now() - cachedData.timestamp) / (1000 * 60))} min de antigüedad)`);
            } else {
                // No hay datos de fallback disponibles
                setData(null);
                setIsFromCache(false);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Error desconocido al obtener los datos.");
                }
            }
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            
            // Limpiar cache antiguo al inicio
            cleanOldCache();
            
            const cacheKey = generateCacheKey(city);
            const cachedData = getCachedData(cacheKey);
            
            // Verificar si hay datos válidos en cache
            if (cachedData && isCacheValid(cachedData, cacheTimeMinutes)) {
                console.log(`Usando datos del cache para ${city.name} (${Math.round((Date.now() - cachedData.timestamp) / (1000 * 60))} min de antigüedad)`);
                setData(cachedData.data);
                setIsFromCache(true);
                setError(null);
                setLoading(false);
                return;
            }
            
            // Si no hay cache válido, obtener datos frescos de la API
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=${city.timezone}`;
            
            await fetchFromAPI(url, cacheKey);
            setLoading(false);
        };

        loadData();
    }, [city.name, city.latitude, city.longitude, city.timezone, cacheTimeMinutes]);

    return { data, loading, error, isFromCache };
}