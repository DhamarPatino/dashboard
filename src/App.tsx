import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import { useState } from 'react';
import OnlineUI from './components/OnlineUI';
import { CardContent } from '@mui/material';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
function App() {
   const [coords, setCoords] = useState({ lat: -2.17, lon: -79.92 });
   const dataFetcherOutput = DataFetcher(coords);
   const [lastUpdated] = useState(new Date());

   return (
      <>
         <Grid container spacing={5} justifyContent="center" alignItems="center">

            {/* Encabezado: ocupa todo el ancho */}
            <Grid container size={{ xs: 12, md: 12 }} justifyContent="center" alignItems="center">
               <Grid size={{ xs: 12, md: 9 }}>
                  <HeaderUI />
               </Grid>
               <Grid size={{ xs: 12, md: 1.8 }} className="flex-row items-center justify-between">
                  <OnlineUI />
               </Grid>
               <Grid size={{ xs: 12, md: 1.2 }} className="flex-row items-center justify-end">
                  <div><p className="text-sky-100 text-sm">
                     🕒 {lastUpdated.toLocaleTimeString()}
                  </p>
                  </div>
               </Grid>
            </Grid>


            {/* Alertas */}
            <Grid size={{ xs: 12, md: 12 }}
               container justifyContent="right" alignItems="center">
               <AlertUI description="No se preveen lluvias" />
            </Grid>

            {/* Selector */}
            <Grid size={{ xs: 12, md: 12 }}>
                   
                   <CardContent>
                     <SelectorUI onCityChange={setCoords}/>
                  </CardContent>
                  
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
                     {/*<Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                           title='Presión atmosférica'
                           description={dataFetcherOutput.data.current.surface_pressure + " " + dataFetcherOutput.data.current_units.surface_pressure} />
                     </Grid>
                     <Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                           title='Visibilidad'
                           description={dataFetcherOutput.data.hourly.visibility[0] + " " + dataFetcherOutput.data.hourly_units.visibility} />
                     </Grid>*/}
                  </>
               )}

            </Grid>
            {/* Gráfico */}
            <Grid sx={{ display: { xs: "none", md: "block" } }} size={{ xs: 6, md: 6 }}>
              <ChartUI
                loading={dataFetcherOutput.loading}
                error={dataFetcherOutput.error}
                data={dataFetcherOutput.data}
              />
            </Grid>
            {/* Tabla */}
            <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
              <TableUI
                loading={dataFetcherOutput.loading}
                error={dataFetcherOutput.error}
                data={dataFetcherOutput.data}
              />
            </Grid>
            {/* Información adicional */}
            <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

         </Grid>
      </>)
}

export default App
