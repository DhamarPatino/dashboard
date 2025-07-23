import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useCohereAssistant } from "../functions/CohereAssistantFetcher";
import type { WeatherParams } from "../functions/CohereAssistantFetcher";
type Props = {
    weatherParams: WeatherParams;
};

const CohereAssistant: React.FC<Props> = ({ weatherParams }) => {
    const {
        userQuery,
        setUserQuery,
        response,
        error,
        callCount,
        loading,
        handleQuery,
        API_CALL_LIMIT
    } = useCohereAssistant(weatherParams);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && userQuery && !loading && callCount < API_CALL_LIMIT) {
            handleQuery();
        }
    };

    return (
        <Box
            sx={{
                mt: 4,
                mb: 2,
                p: 3,
                borderRadius: 4,
                bgcolor: 'rgba(186,230,253,0.7)',
                boxShadow: 3,
                border: '1px solid #38bdf8',
                mx: 2, // Esto establece márgenes horizontales de 2 (izquierda y derecha)
                backdropFilter: 'blur(6px)',
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ChatBubbleOutlineIcon sx={{ color: "#0ea5e9", fontSize: 32, mr: 1 }} />
                <Typography variant="h6" sx={{ color: "#0ea5e9", fontWeight: 700 }}>
                    Asistente de Cohere
                </Typography>
            </Box>
            <TextField
                fullWidth
                variant="outlined"
                label="Haz una pregunta sobre el clima..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading || callCount >= API_CALL_LIMIT}
                sx={{
                    bgcolor: "rgba(255,255,255,0.8)",
                    borderRadius: 2,
                    mb: 2,
                    input: { color: "#0ea5e9" },
                    label: { color: "#0ea5e9" }
                }}
            />
            <Button
                variant="contained"
                onClick={handleQuery}
                disabled={loading || !userQuery || callCount >= API_CALL_LIMIT}
                sx={{
                    bgcolor: "#0ea5e9",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                    boxShadow: 2,
                    '&:hover': { bgcolor: "#0284c7" }
                }}
            >
                {loading ? "Consultando..." : "Preguntar"}
            </Button>
            <Box sx={{ mt: 3 }}>
                {response && (
                    <Box sx={{
                        background: "linear-gradient(90deg, #bae6fd 0%, #e0f2fe 100%)",
                        color: "#0369a1",
                        p: 2,
                        borderRadius: 3,
                        boxShadow: 1,
                        mb: 1,
                        fontSize: 16,
                        fontWeight: 500,
                        border: "1px solid #7dd3fc"
                    }}>
                        <strong>Respuesta:</strong> {response}
                    </Box>
                )}
                {error && (
                    <Typography sx={{ color: "#ef4444", mt: 1, fontWeight: 500 }}>
                        {error}
                    </Typography>
                )}
                <Typography sx={{ mt: 2, fontSize: 13, color: "#64748b" }}>
                    Consultas restantes: <b>{API_CALL_LIMIT - callCount}</b>
                </Typography>
            </Box>
        </Box>
    );
};

export default CohereAssistant;