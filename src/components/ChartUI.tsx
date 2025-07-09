import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
    arrValues1: number[];
    arrValues2: number[];
    arrLabels: string[];
}


export default function ChartUI(props: ChartUIProps) {
   // Define cuántos registros mostrar
   const maxItems = 24;

   // Recorta los arreglos
   const arrValues1 = props.arrValues1.slice(0, maxItems);
   const arrValues2 = props.arrValues2.slice(0, maxItems);
   const arrLabels = props.arrLabels.slice(0, maxItems);
   

   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura 2m (°C) y Velocidad del viento 10m (km/h)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: arrValues1, label: 'Temperatura 2m (°C)' },
               { data: arrValues2, label: 'Velocidad del viento 10m (km/h)' },
            ]}
            xAxis={[{ scaleType: 'point', data: arrLabels }]}
         />
      </>
   );
}