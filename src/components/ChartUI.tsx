import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ChartUIProps {
  loading: boolean;
  error: string | null;
  data: {
    hourly: {
      time: string[];
      temperature_2m: number[];
      wind_speed_10m: number[];
    };
  } | null;
}

export default function ChartUI({ loading, error, data }: ChartUIProps) {
  const [selectedMetric, setSelectedMetric] = useState<'temperature' | 'wind' | 'both'>('both');

  if (loading) return <Typography>Cargando gráfico...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!data) return null;

  const chartData = data.hourly.time.slice(0, 24).map((time, index) => ({
    time: new Date(time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    temperature: Math.round(data.hourly.temperature_2m[index]),
    wind: Math.round(data.hourly.wind_speed_10m[index]),
  }));

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newMetric: typeof selectedMetric | null) => {
    if (newMetric !== null) {
      setSelectedMetric(newMetric);
    }
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: 800,
      height: 450,
      mx: 'auto',
      p: 2,
      borderRadius: 4,
      bgcolor: 'rgba(186, 230, 253, 0.5)',
      backdropFilter: 'blur(6px)',
      overflow: 'visible',
      '@media (prefers-color-scheme: dark)': {
        bgcolor: 'rgba(51, 65, 85, 0.7)',
        color: '#ffffff',
        '& .recharts-text': { fill: '#ffffff !important' }
      },
      '@media (prefers-color-scheme: light)': {
        bgcolor: 'rgba(186, 230, 253, 0.5)',
        color: '#1a1a1a',
        '& .recharts-text': { fill: '#475569 !important' }
      }
    }}>
      <Typography variant="h5" sx={{ mb: 2 }}>📈 Temperatura y Viento (próximas 24h)</Typography>

      {/* Selector de métrica */}
      <ToggleButtonGroup
        value={selectedMetric}
        exclusive
        onChange={handleChange}
        sx={{ mb: 2 }}
        color="primary"
      >
        <ToggleButton value="temperature">🌡️ Temperatura</ToggleButton>
        <ToggleButton value="wind">💨 Viento</ToggleButton>
        <ToggleButton value="both">🔁 Ambos</ToggleButton>
      </ToggleButtonGroup>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#fb923c" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color, rgba(71, 85, 105, 0.3))" />
          <XAxis dataKey="time" tick={{ fontSize: 12, fill: 'var(--text-color, #475569)' }} />

          {/* Ejes condicionales */}
          {(selectedMetric === 'temperature' || selectedMetric === 'both') && (
            <YAxis
              yAxisId="left"
              label={{
                value: 'Temperatura (°C)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: 'var(--text-color, #475569)' }
              }}
              tick={{ fontSize: 12, fill: 'var(--text-color, #475569)' }}
            />
          )}
          {(selectedMetric === 'wind' || selectedMetric === 'both') && (
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: 'Viento (km/h)',
                angle: 90,
                position: 'insideRight',
                style: { textAnchor: 'middle', fill: 'var(--text-color, #475569)' }
              }}
              tick={{ fontSize: 12, fill: 'var(--text-color, #475569)' }}
            />
          )}

          <Tooltip
            formatter={(value, name) => [`${value}${name === 'temperature' ? '°C' : ' km/h'}`, name === 'temperature' ? '🌡️ Temperatura' : '💨 Viento']}
            labelFormatter={(label) => `🕐 ${label}`}
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg, white)',
              borderRadius: '12px',
              border: '1px solid var(--tooltip-border, #ccc)',
              color: 'var(--tooltip-text, #000)',
            }}
          />

          {/* Líneas condicionales */}
          {(selectedMetric === 'temperature' || selectedMetric === 'both') && (
            <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#f97316" fill="url(#tempGradient)" />
          )}
          {(selectedMetric === 'wind' || selectedMetric === 'both') && (
            <Line yAxisId="right" type="monotone" dataKey="wind" stroke="#0ea5e9" fill="url(#windGradient)" strokeDasharray="5 5" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
