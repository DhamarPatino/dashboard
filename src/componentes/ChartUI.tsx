
import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

export default function ChartUI() {
   const [labels, setLabels] = useState<string[]>([]);
   const [values1, setValues1] = useState<number[]>([]);
   const [values2, setValues2] = useState<number[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m&timezone=America%2FChicago')
         .then(res => res.json())
         .then(data => {
            setLabels(data.hourly.time);
            setValues1(data.hourly.temperature_2m);
            setValues2(data.hourly.relative_humidity_2m);
            setLoading(false);
         })
         .catch(() => setLoading(false));
   }, []);

   return (
      <>
         <Typography variant="h5" component="div">
            {loading ? 'Cargando gráfico...' : 'Temperatura y Humedad por hora'}
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: values1, label: 'Temperatura (°C)' },
               { data: values2, label: 'Humedad (%)' },
            ]}
            xAxis={[{ scaleType: 'point', data: labels }]}
         />
      </>
   );
}
/*
export default function ChartUI() {
   return (
      <>
         <Typography variant="h5" component="div">
            Chart arrLabels vs arrValues1 & arrValues2
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: arrValues1, label: 'value1'},
               { data: arrValues2, label: 'value2'},
            ]}
            xAxis={[{ scaleType: 'point', data: arrLabels }]}
         />
      </>
   );
}*/