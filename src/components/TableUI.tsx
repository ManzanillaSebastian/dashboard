import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { 
    field: 'id', 
    headerName: 'Hora', 
    flex: 1 
   },
   {
      field: 'value1',
      headerName: 'Temperatura 2m (°C)',
      flex: 1,
   },
   {
      field: 'value2',
      headerName: 'Velocidad del viento 10m (km/h)',
      flex: 1,
   }
];

interface TableUIProps {
    arrValues1: number[];
    arrValues2: number[];
    arrLabels: string[];
}

export default function TableUI(props: TableUIProps) {

   const rows = combineArrays(props.arrLabels, props.arrValues1, props.arrValues2);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}