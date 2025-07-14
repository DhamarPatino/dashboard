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

// Duración de la vigencia del caché en minutos
const CACHE_DURATION_MINUTES = 10;

function getCacheKey(lat: number, lon: number) {
    return `openmeteo_${lat}_${lon}`;
}

function isCacheValid(timestamp: number) {
    const now = Date.now();
    return (now - timestamp) < CACHE_DURATION_MINUTES * 60 * 1000;
}

export default function DataFetcher({ lat, lon }: DataFetcherProps) : DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cacheKey = getCacheKey(lat, lon);
        const cached = localStorage.getItem(cacheKey);
        let cacheData: { data: OpenMeteoResponse, timestamp: number } | null = null;
        if (cached) {
            try {
                cacheData = JSON.parse(cached);
            } catch {
                cacheData = null;
            }
        }
        // Si hay caché válido, úsalo y no hagas fetch
        if (cacheData && isCacheValid(cacheData.timestamp)) {
            setData(cacheData.data);
            setLoading(false);
            setError(null);
            return;
        }

        // Si no hay caché válido, haz fetch
        
        // Reemplace con su URL de la API de Open-Meteo obtenida en actividades previas
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);
                setError(null);
                // Guarda en caché con timestamp
                localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
            } catch (err: any) {
                // Si hay error y hay caché (aunque esté vencido), úsalo como respaldo
                if (cacheData) {
                    setData(cacheData.data);
                    setError("Error al actualizar, mostrando datos almacenados.");
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [lat, lon]); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}