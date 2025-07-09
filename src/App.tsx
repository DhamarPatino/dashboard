import { useState } from 'react'
import { Grid } from '@mui/material';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HeaderUI from './componentes/HeaderUI';
import AlertUI from './componentes/AlertUI';
import SelectorUI from './componentes/SelectorUI';
import IndicatorUI from './componentes/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './componentes/TableUI';
import ChartUI from './componentes/ChartUI';
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const dataFetcherOutput = DataFetcher();
  const [lastUpdated] = useState<Date>(new Date());
  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 2, md: 12 }}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} justifyContent="right" alignItems="center">
        <AlertUI config={{ description: "No se preveen lluvias" }} />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI />
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >

        {/* Renderizado condicional de los datos obtenidos */}

        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
          <>

            {/* Indicadores con datos obtenidos */}

            <Grid size={{ xs: 12, md: 3 }} >
              <IndicatorUI
                title='Temperatura (2m)'
                description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
            </Grid>



            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento'
                description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa'
                description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Presión atmosférica'
                description={dataFetcherOutput.data.current.surface_pressure + " " + dataFetcherOutput.data.current_units.surface_pressure} />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Visibilidad'
                description={dataFetcherOutput.data.hourly.visibility[0] + " " + dataFetcherOutput.data.hourly_units.visibility} />
            </Grid>
          </>
        )}

      </Grid>
      {/* Gráfico */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI />
      </Grid>
      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  )

}

export default App;

