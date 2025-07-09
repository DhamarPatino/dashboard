import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
  loading: boolean;
  error: string | null;
  data: any;
}

export default function ChartUI({ loading, error, data }: ChartUIProps) {
  if (loading) return <Typography>Cargando gráfico...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!data) return null;

  // Ejemplo: usar los primeros 7 valores de temperatura y viento horario
  const arrLabels = data.hourly.time.slice(0, 7);
  const arrValues1 = data.hourly.temperature_2m.slice(0, 7);
  const arrValues2 = data.hourly.wind_speed_10m.slice(0, 7);

  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura y Viento (próximas horas)
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: arrValues1, label: 'Temperatura (°C)' },
          { data: arrValues2, label: 'Viento (km/h)' },
        ]}
        xAxis={[{ scaleType: 'point', data: arrLabels }]}
      />
    </>
  );
}