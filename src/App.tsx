import { useState } from 'react'
import './App.css'
import { Grid } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid item xs={12} md={12}>Elemento: Encabezado</Grid>

      {/* Alertas */}
      <Grid item xs={12} md={12}>Elemento: Alertas</Grid>

      {/* Selector */}
      <Grid item xs={12} md={3}>Elemento: Selector</Grid>

      {/* Indicadores */}
      <Grid item xs={12} md={9}>Elemento: Indicadores</Grid>

      {/* Gráfico */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
      >
        Elemento: Gráfico
      </Grid>

      {/* Tabla */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
      >
        Elemento: Tabla
      </Grid>

      {/* Información adicional */}
      <Grid item xs={12} md={12}>Elemento: Información adicional</Grid>

    </Grid>
  )
}

export default App
