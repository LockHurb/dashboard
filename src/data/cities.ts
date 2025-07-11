export interface City {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export const cities: Record<string, City> = {
  guayaquil: {
    name: "Guayaquil",
    latitude: -2.1709,
    longitude: -79.9224,
    timezone: "America%2FGuayaquil"
  },
  quito: {
    name: "Quito", 
    latitude: -0.1807,
    longitude: -78.4678,
    timezone: "America%2FGuayaquil"
  },
  manta: {
    name: "Manta",
    latitude: -0.9677,
    longitude: -80.7089,
    timezone: "America%2FGuayaquil"
  },
  cuenca: {
    name: "Cuenca",
    latitude: -2.9001,
    longitude: -79.0059,
    timezone: "America%2FGuayaquil"
  }
};

export const getDefaultCity = (): City => cities.guayaquil;
