import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SeclectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import { useState, useEffect } from 'react';
import OnlineUI from './components/OnlineUI';
import { Card, CardHeader, CardContent } from '@mui/material';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import VisibilityIcon from '@mui/icons-material/Visibility';
function App() {
   const [coords, setCoords] = useState({ lat: -2.17, lon: -79.92 });
   const dataFetcherOutput = DataFetcher(coords);
   const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 1000); // Actualiza cada segundo
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

   return (
      <>
         <Grid container spacing={5} justifyContent="center" alignItems="center">

            <Grid
               container
               size={{ xs: 12, md: 12 }}
               justifyContent="center"
               alignItems="center"
               sx={{
                  background: 'linear-gradient(90deg, #7edcff 0%, #4f8cff 100%)',
                  borderRadius: 3,
                  mb: 2,
                  p: 2
               }}
            >
               <Grid size={{ xs: 12, md: 9 }}>
                  <HeaderUI />
               </Grid>
               <Grid size={{ xs: 12, md: 1.8 }} className="flex-row items-center justify-between">
                  <OnlineUI />
               </Grid>
               <Grid size={{ xs: 12, md: 1.2 }} className="flex-row items-center justify-end">
                  <div>
                     <p className="text-white text-sm">
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
                     <SeclectorUI onCityChange={setCoords}/>
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
                           title='🌡️Temperatura'
                           description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m}
                           background="linear-gradient(90deg, #ffb347 0%, #ff5e62 100%)"
                           icon={<DeviceThermostatIcon fontSize="large" />}
                        />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                           title='💨Viento'
                           description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m}
                           background="linear-gradient(90deg,rgb(103, 235, 158) 0%,rgb(82, 228, 172) 100%)"
                           icon={<AirIcon fontSize="large" />}
                        />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                           title='💧Humedad'
                           description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m}
                           background="linear-gradient(90deg, #89f7fe 0%, #66a6ff 100%)"
                           icon={<WaterDropIcon fontSize="large" />}
                        />
                     </Grid>
                     <Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                           title='⚡ Presión atmosférica'
                           description={dataFetcherOutput.data.current.surface_pressure + " " + dataFetcherOutput.data.current_units.surface_pressure}
                           background="linear-gradient(90deg,rgb(107, 99, 126) 0%,rgb(75, 70, 73) 100%)"
                           icon={<ThermostatAutoIcon fontSize="large" />}
                        />
                     </Grid>
                     <Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                           title='👀 Visibilidad'
                           description={dataFetcherOutput.data.hourly.visibility[0] + " " + dataFetcherOutput.data.hourly_units.visibility}
                           background="linear-gradient(90deg,rgb(151, 104, 196) 0%,rgb(122, 78, 172) 100%)"
                           icon={<VisibilityIcon fontSize="large" />}
                        />
                     </Grid>
                  </>
               )}

            </Grid>
            {/* Gráfico */}
            <Grid sx={{ display: { xs: "none", md: "block" } }}
               size={{ xs: 12, md: 6 }}>Elemento: Gráfico</Grid>

            {/* Tabla */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

            {/* Información adicional */}
            <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

         </Grid>
      </>)
}

export default App
