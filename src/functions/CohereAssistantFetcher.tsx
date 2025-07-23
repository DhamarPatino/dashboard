import React, { useState } from "react";

const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY || "";
const COHERE_GENERATE_ENDPOINT = "https://api.cohere.ai/v1/generate";
const API_CALL_LIMIT = 10; // Límite de llamadas por sesión

export interface WeatherParams {
    temperature: number;
    humidity: number;
    wind: number;
    city?: string;
    condition?: string;
}

export function useCohereAssistant(weatherParams: WeatherParams) {
    const [userQuery, setUserQuery] = useState("");
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [callCount, setCallCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleQuery = async () => {
        setError(null);
        setResponse(null);

        if (callCount >= API_CALL_LIMIT) {
            setError("Límite de consultas alcanzado. Inténtalo más tarde.");
            return;
        }

        setLoading(true);

        try {
            const prompt = `
            Responde SIEMPRE en español, no traduzcas tan literal, las oraciones deben tener sentido. Solo responde con la información que necesita.
            Datos actuales del clima:
            - Temperatura: ${weatherParams.temperature}°C
            - Humedad: ${weatherParams.humidity}%
            - Viento: ${weatherParams.wind} km/h
            ${weatherParams.city ? `- Ciudad: ${weatherParams.city}` : ""}
            ${weatherParams.condition ? `- Condición: ${weatherParams.condition}` : ""}
            El usuario pregunta: "${userQuery}". Responde de forma clara, útil y con sentido, considerando los datos del clima.
            `;

            const res = await fetch(COHERE_GENERATE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${COHERE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
                    model: "command"
                }),
            });

            if (!res.ok) {
                throw new Error(`Error de API: ${res.status}`);
            }

            const data = await res.json();

            if (data.generations && data.generations[0]?.text) {
                setResponse(data.generations[0].text);
            } else {
                setError("No se recibió una respuesta válida de Cohere.");
            }
            setCallCount((prev) => prev + 1);
        } catch (err: any) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        userQuery,
        setUserQuery,
        response,
        error,
        callCount,
        loading,
        handleQuery,
        API_CALL_LIMIT
    };
}