import React, { useState } from "react";

const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY || "";
const COHERE_GENERATE_ENDPOINT = "https://api.cohere.ai/v1/generate";
const API_CALL_LIMIT = 10; // Límite de llamadas por sesión

type CohereAssistantProps = {
    weatherParams: {
        temperature: number;
        humidity: number;
        wind: number;
        city?: string;
        condition?: string;
    };
};

const CohereAssistant: React.FC<CohereAssistantProps> = ({ weatherParams }) => {
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
            // Construye el prompt con todos los datos disponibles
            const prompt = `
            Datos actuales del clima:
            - Temperatura: ${weatherParams.temperature}°C
            - Humedad: ${weatherParams.humidity}%
            - Viento: ${weatherParams.wind} km/h
            ${weatherParams.city ? `- Ciudad: ${weatherParams.city}` : ""}
            ${weatherParams.condition ? `- Condición: ${weatherParams.condition}` : ""}
            El usuario pregunta: "${userQuery}". Responde de forma clara y útil, considerando los datos del clima.
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

    return (
        <div style={{ marginTop: 24 }}>
            <h3>Asistente de Cohere</h3>
            <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Haz una pregunta sobre el clima..."
                style={{ width: "70%", marginRight: 8 }}
                disabled={loading || callCount >= API_CALL_LIMIT}
            />
            <button onClick={handleQuery} disabled={loading || !userQuery || callCount >= API_CALL_LIMIT}>
                {loading ? "Consultando..." : "Preguntar"}
            </button>
            <div style={{ marginTop: 16 }}>
                {response && (
                    <div style={{ background: "#e6f7ff", padding: 12, borderRadius: 6 }}>
                        <strong>Respuesta:</strong> {response}
                    </div>
                )}
                {error && (
                    <div style={{ color: "red", marginTop: 8 }}>
                        {error}
                    </div>
                )}
                <div style={{ marginTop: 8, fontSize: 12, color: "#888" }}>
                    Consultas restantes: {API_CALL_LIMIT - callCount}
                </div>
            </div>
        </div>
    );
};

export default CohereAssistant;