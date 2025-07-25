import './App.css';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

import HeaderUI from './components/HeaderUI';
import PrecipitationAlertUI from './components/PrecipitationAlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import CohereTipsUI from './components/CohereTipsUI';

import DataFetcher from './functions/DataFetcher';
import getCohereResponse from './functions/CohereAssistant';

function App() {

  const [cityInput, setCityInput] = useState('guayaquil');

  const dataFetcherOutput = DataFetcher(cityInput);
  const respuestaCohere = getCohereResponse(cityInput, dataFetcherOutput.data!);


  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }}>
        <Grid container justifyContent="right" alignItems="center">
          <PrecipitationAlertUI precipitation={dataFetcherOutput.data?.current.precipitation ?? 0}/>
        </Grid>
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI cityInput={cityInput} onCityChange={setCityInput} />
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
                    title='Temperatura aparente'
                    description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
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
          </>
        )}
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        {/* Renderizado condicional de los datos obtenidos */}
        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
          <ChartUI
            arrValues1={dataFetcherOutput.data.hourly.temperature_2m}
            arrValues2={dataFetcherOutput.data.hourly.wind_speed_10m}
            arrLabels={dataFetcherOutput.data.hourly.time}
          />
        )}
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        {/* Renderizado condicional de los datos obtenidos */}
        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && (
          <TableUI
            arrValues1={dataFetcherOutput.data.hourly.temperature_2m}
            arrValues2={dataFetcherOutput.data.hourly.wind_speed_10m}
            arrLabels={dataFetcherOutput.data.hourly.time}
          />
        )}
      </Grid>

      {/* Información adicional */}
      <Grid container size={{ xs: 12, md: 12 }}>

        <Grid size={{ xs: 12, md: 12 }}>

          <Typography variant="h4" sx={{fontWeight: 'bold'}}>
            Recomendaciones
          </Typography>

        </Grid>
      
        {respuestaCohere.loading && 
          <Typography variant="h5">
            Cargando recomendaciones...
          </Typography>}

        {(!respuestaCohere.loading && respuestaCohere.error) && 
          <Alert variant="standard" severity="error"> 
            {respuestaCohere.error} 
          </Alert>}

        {(!respuestaCohere.loading && respuestaCohere.respuesta) && (
        <Grid container sx={{alignItems: "stretch"}}>
          <CohereTipsUI contenido={respuestaCohere.respuesta}/>
        </Grid>)}
      
      </Grid>

    </Grid>
  )
}

export default App
