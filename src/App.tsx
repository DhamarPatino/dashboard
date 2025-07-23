import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SeclectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import { useState, useEffect } from 'react';
import OnlineUI from './components/OnlineUI';
import { CardContent } from '@mui/material';
import ChartUI from './components/ChartUI';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { defaultLocations } from './functions/Locations';
import type { Location } from './functions/Locations';
import TableUI from './components/TableUI';
import CohereAssistant from './components/CohereAssistant';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import GrainIcon from '@mui/icons-material/Grain';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';


function App() {
   const [coords, setCoords] = useState({ lat: -2.17, lon: -79.92 });
   const dataFetcherOutput = DataFetcher({ lat: coords.lat, lon: coords.lon });
   const [lastUpdated, setLastUpdated] = useState(new Date());
   const [locations] = useState<Location[]>(defaultLocations);

   console.log("DataFetcher Output:", dataFetcherOutput);

   return (
      <>
         <Grid container spacing={2} justifyContent="center" alignItems="center" >

            {/* Encabezado: ocupa todo el ancho */}
            <Grid container size={{ xs: 12, md: 12 }} justifyContent="center" alignItems="center"
               sx={{
                  background: 'transparent',
                  backdropFilter: 'blur(6px)',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)', // sombra más sutil
                  px: 2, // padding horizontal más reducido
                  py: 0, // padding vertical más compacto
                  width: '100%',
                  position: 'relative',
                  zIndex: 10,
               }}
            >
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
            <Grid size={12} >
               <AlertUI weatherData={dataFetcherOutput.data} />
            </Grid>


            {/* Selector */}
            <Grid size={{ xs: 12, md: 12 }}>
               <CardContent>
                  <SeclectorUI
                     locations={locations}
                     onCityChange={setCoords}
                  />
               </CardContent>

            </Grid>

            {/* Indicadores */}
            <Grid container spacing={5} justifyContent="center" alignItems="center" >
               <Grid container size={{ xs: 12, md: 9 }} >

                  {/* Renderizado condicional de los datos obtenidos */}

                  {dataFetcherOutput.loading && <p>Cargando datos...</p>}
                  {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
                  {dataFetcherOutput.data && (
                     <>

                        {/* Indicadores con datos obtenidos */}
                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title='Temperatura (2m)'
                              description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m}
                              icon={<ThermostatIcon sx={{ color: "#fff", fontSize: 32 }} />}
                              iconBg="linear-gradient(135deg, #ff9800 0%, #f44336 100%)"
                           />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title='Humedad relativa'
                              description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m}
                              icon={<WaterDropIcon sx={{ color: "#fff", fontSize: 32 }} />}
                              iconBg="linear-gradient(135deg, #43cea2 0%, #185a9d 100%)"
                           />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title='Presión atmosférica'
                              description={dataFetcherOutput.data.current.surface_pressure + " " + dataFetcherOutput.data.current_units.surface_pressure}
                              icon={<ThermostatAutoIcon sx={{ color: "#fff", fontSize: 32 }} />}
                              iconBg="linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
                           />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title='Viento'
                              description={
                                 `${dataFetcherOutput.data.current.wind_speed_10m} ${dataFetcherOutput.data.current_units.wind_speed_10m} ` +
                                 `| Dirección: ${dataFetcherOutput.data.current.wind_direction_10m}°`
                              }
                              icon={
                                 <AirIcon
                                    sx={{
                                       color: "#fff",
                                       fontSize: 32,
                                       transform: `rotate(${dataFetcherOutput.data.current.wind_direction_10m}deg)`
                                    }}
                                 />
                              }
                              iconBg="linear-gradient(135deg, #00c6fb 0%, #005bea 100%)"
                           />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title='Probabilidad de lluvia'
                              description={dataFetcherOutput.data.hourly.precipitation_probability[0] + " %"}
                              icon={<WaterDropIcon sx={{ color: "#fff", fontSize: 32 }} />}
                              iconBg="linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)"
                           />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title='Visibilidad'
                              description={
                                 dataFetcherOutput.data.hourly.visibility[
                                 dataFetcherOutput.data.hourly.visibility.length - 1
                                 ] / 1000 + " km"
                              }
                              icon={<VisibilityIcon sx={{ color: "#fff", fontSize: 32 }} />}
                              iconBg="linear-gradient(135deg, #00c853 0%, #b2ff59 100%)"
                           />
                        </Grid>

                        {/* Índice UV */}
                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title='Índice UV Máximo'
                              description={
                                 (dataFetcherOutput.data.daily?.uv_index_max?.[0] ?? "N/D") +
                                 (dataFetcherOutput.data.daily?.uv_index_max ? " UV" : "")
                              }
                              icon={<ThermostatIcon sx={{ color: "#fff", fontSize: 32 }} />}
                              iconBg="linear-gradient(135deg, #fbbf24 0%, #f59e42 100%)"
                           />
                        </Grid>

                        {/* Estado del cielo */}
                        <Grid size={{ xs: 12, md: 3 }}>
                           <IndicatorUI
                              title='Condición del cielo'
                              description={getWeatherDescription(dataFetcherOutput.data.current.weather_code)}
                              icon={getWeatherIcon(dataFetcherOutput.data.current.weather_code)}
                              iconBg="linear-gradient(135deg, #60a5fa 0%, #fbbf24 100%)"
                           />
                        </Grid>

                     </>
                  )}

               </Grid>
            </Grid>
            {/* Gráfico y Tabla */}
            <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
               <ChartUI
                  loading={dataFetcherOutput.loading}
                  error={dataFetcherOutput.error}
                  data={dataFetcherOutput.data}
               />

            </Grid>

            <Grid size={{ xs: 12, md: 12 }} sx={{ mx: "auto" }}>
               <TableUI
                  loading={dataFetcherOutput.loading}
                  error={dataFetcherOutput.error}
                  data={dataFetcherOutput.data}
               />
            </Grid>

            {/* Información adicional */}
            <Grid size={{ xs: 12, md: 12 }}>
               {dataFetcherOutput.data && (
                  <CohereAssistant
                     weatherParams={{
                        temperature: dataFetcherOutput.data.current.temperature_2m,
                        humidity: dataFetcherOutput.data.current.relative_humidity_2m,
                        wind: dataFetcherOutput.data.current.wind_speed_10m,
                     }}
                  />
               )}
            </Grid>

         </Grid>
      </>)
}

function getWeatherDescription(code: number) {
   // Puedes ajustar según la documentación de Open-Meteo
   if ([0].includes(code)) return "Despejado";
   if ([1, 2].includes(code)) return "Mayormente despejado";
   if ([3].includes(code)) return "Parcialmente nublado";
   if ([45, 48].includes(code)) return "Niebla";
   if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Lluvia";
   if ([71, 73, 75, 77, 85, 86].includes(code)) return "Nieve";
   if ([95, 96, 99].includes(code)) return "Tormenta";
   return "Desconocido";
}

function getWeatherIcon(code: number) {
   if ([0].includes(code)) return <WbSunnyIcon sx={{ color: "#fff", fontSize: 32 }} />;
   if ([1, 2, 3].includes(code)) return <CloudIcon sx={{ color: "#fff", fontSize: 32 }} />;
   if ([45, 48].includes(code)) return <GrainIcon sx={{ color: "#fff", fontSize: 32 }} />;
   if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <WaterDropIcon sx={{ color: "#fff", fontSize: 32 }} />;
   if ([71, 73, 75, 77, 85, 86].includes(code)) return <GrainIcon sx={{ color: "#fff", fontSize: 32 }} />;
   if ([95, 96, 99].includes(code)) return <ThunderstormIcon sx={{ color: "#fff", fontSize: 32 }} />;
   return <CloudIcon sx={{ color: "#fff", fontSize: 32 }} />;
}

export default App
