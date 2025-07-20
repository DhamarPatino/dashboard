import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AlertTriangle, CloudRain, Wind, Thermometer } from 'lucide-react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface AlertUIProps {
  weatherData: OpenMeteoResponse | null;
}

const AlertUI = ({ weatherData }: AlertUIProps) => {
  if (!weatherData) return null;

  const alerts: {
    type: 'info' | 'warning' | 'success';
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
  }[] = [];

  const currentTemp = weatherData.current.temperature_2m;
  const currentHumidity = weatherData.current.relative_humidity_2m;
  const currentWindSpeed = weatherData.current.wind_speed_10m;

  const tomorrowPrecipitation = weatherData.daily?.rain_sum?.[1] ?? 0;
  const tomorrowTempMax = weatherData.daily?.temperature_2m_max?.[1] ?? 0;
  const tomorrowTempMin = weatherData.daily?.temperature_2m_min?.[1] ?? 0;
  const tomorrowWind = weatherData.daily?.wind_speed_10m_max?.[1] ?? 0;

  // Alertas basadas en condiciones
  if (currentTemp > 35) {
    alerts.push({
      type: 'warning',
      icon: Thermometer,
      title: 'Alerta de Calor Extremo 🔥',
      description: `Temperatura actual: ${Math.round(currentTemp)}°C. Mantente hidratado y evita la exposición prolongada al sol.`,
      color: '#f87171',
    });
  } else if (currentTemp < 0) {
    alerts.push({
      type: 'warning',
      icon: Thermometer,
      title: '🧊 Alerta de Frío Extremo',
      description: `Temperatura actual: ${Math.round(currentTemp)}°C. Toma precauciones contra la congelación.`,
      color: '#60a5fa',
    });
  }

  if (currentWindSpeed > 50) {
    alerts.push({
      type: 'warning',
      icon: Wind,
      title: '💨 Vientos Fuertes',
      description: `Velocidad del viento: ${Math.round(currentWindSpeed)} km/h. Precaución al conducir y con objetos al aire libre.`,
      color: '#34d399',
    });
  }

  if (tomorrowPrecipitation > 10) {
    alerts.push({
      type: 'info',
      icon: CloudRain,
      title: 'Lluvia Intensa Esperada 🌧️',
      description: `Se esperan ${tomorrowPrecipitation} mm de lluvia mañana. Considera llevar paraguas.`,
      color: '#93c5fd',
    });
  }

  if (currentHumidity > 80) {
    alerts.push({
      type: 'info',
      icon: AlertTriangle,
      title: 'Humedad Alta 💧',
      description: `Humedad actual: ${currentHumidity}%. Sensación térmica elevada.`,
      color: '#67e8f9',
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      type: 'success',
      icon: AlertTriangle,
      title: 'Condiciones Perfectas 🌟',
      description: 'Las condiciones climáticas actuales son estables y agradables. ¡Perfecto para salir!',
      color: '#86efac',
    });
  }

  return (
    <Box sx={{px: 2}}>
      <Grid container>
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <MuiAlert
                severity={alert.type}
                icon={false}
                sx={{
                  borderRadius: 3,
                  background: `${alert.color}20`,
                  backdropFilter: 'blur(4px)',
                  border: `1px solid ${alert.color}40`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  px: 3,
                  py: 2,
                  color: 'var(--contrast-text) !important',
                  '@media (prefers-color-scheme: dark)': {
                    color: '#ffffff !important',
                  },
                  '@media (prefers-color-scheme: light)': {
                    color: '#1a1a1a !important',
                  }
                }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Icon color={alert.color} size={20} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {alert.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {alert.description}
                  </Typography>
                </Box>
              </MuiAlert>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AlertUI;  