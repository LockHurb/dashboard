import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
import type { City } from '../data/cities';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

interface DataFetcherProps {
    city: City;
}

export default function DataFetcher({ city }: DataFetcherProps) : DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        // URL dinámica basada en la ciudad seleccionada
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=${city.timezone}`;
        
        const fetchData = async () => {

            try {

                setLoading(true);
                setError(null);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const result: OpenMeteoResponse = await response.json();
                setData(result);

            } catch (err: any) {

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }

            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [city]); // Ahora el efecto se ejecuta cuando cambia la ciudad

    return { data, loading, error };

}