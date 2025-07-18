import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherProps {
  lat: number;
  lon: number;
}
interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function DataFetcher({ lat, lon }: DataFetcherProps) : DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        // Reemplace con su URL de la API de Open-Meteo obtenida en actividades previas
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,uv_index_max,rain_sum&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,surface_pressure,visibility,wind_speed_10m,wind_direction_10m&current=wind_speed_10m,wind_direction_10m,relative_humidity_2m,temperature_2m,surface_pressure,weather_code,precipitation&timezone=America%2FChicago`

        const fetchData = async () => {

            try {

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
         }, [lat, lon]);// El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}