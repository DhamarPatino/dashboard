import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function DataFetcher() : DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        // Reemplace con su URL de la API de Open-Meteo obtenida en actividades previas
        const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,uv_index_max,rain_sum&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,surface_pressure,visibility,wind_speed_10m,wind_direction_10m&current=wind_speed_10m,wind_direction_10m,relative_humidity_2m,temperature_2m,surface_pressure,weather_code,precipitation&timezone=America%2FChicago`

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

    }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}
// Ejemplo de uso






/*
interface DataFetcherOutput {
    data: OpenMeteoResponse | null; // | en caso que no exsita el dato devuelve null
    loading: boolean;
    error: string | null;
}

export default function DataFetcher(): DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);  //usestete cuano se usa memoria
    const [loading, setLoading] = useState(true); //inicia en true porque al iniciar la app esta cargando
    const [error, setError] = useState<string | null>(null); //se rechaza la peticion, null porque no hay error al iniciar
    useEffect(() => {

        // Reemplace con su URL de la API de Open-Meteo obtenida en actividades previas
        const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`

        const fetchData = async () => {

            try {

                const response = await fetch(url); //fetch es una promesa que espera la respuesta de la api
                //quien establece el codigo de la respuesta ? http
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const result: OpenMeteoResponse = await response.json(); //deserializa el json
                setData(result);

            } catch (err: any) {

                if (err instanceof Error) {
                    setError(err.message); //funciones del use state
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos."); 
                }

            } finally {
                setLoading(false);  //independientemente si hubo error o no, ya no esta cargando, siempre va a ejecutarse
            }
        };

        fetchData();

    }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}

//use effect se usa para hacer llamadas a apis o hacer cosas despues de que el componente se haya renderizado
//con array vacio se ejecuta una sola vez (instanceacion)
//con dependencias se ejecuta cada vez que cambian las dependencias, solo con cambios reales con las dependencias
//con los objectos es cuando se asigna valores nuevos set



//use state se usa para guardar datos en memoria
*/