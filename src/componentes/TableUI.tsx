import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   { field: 'label', headerName: 'Hora', width: 150 },
   { field: 'value1', headerName: 'Temperatura (°C)', width: 150 },
   { field: 'value2', headerName: 'Humedad (%)', width: 150 },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 200,
      valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''}°C ${row.value2 || ''}%`,
   },
];

export default function TableUI() {
   const [rows, setRows] = useState<Array<{ id: number; label: string; value1: number; value2: number }>>([]);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m&timezone=America%2FChicago')
         .then(res => res.json())
         .then(data => {
            // Transformar los datos horarios en filas para la tabla
            const horas = data.hourly.time;
            const temps = data.hourly.temperature_2m;
            const hums = data.hourly.relative_humidity_2m;
            const rows = horas.map((hora: string, idx: number) => ({
               id: idx,
               label: hora,
               value1: temps[idx],
               value2: hums[idx],
            }));
            setRows(rows);
            setLoading(false);
         })
         .catch(() => setLoading(false));
   }, []);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
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

/*import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'Temperatura', width: 90 },
   {
      field: 'label',
      headerName: 'Humedad',
      width: 150,
   },
   {
      field: 'value1',
      headerName: 'Value 1',
      width: 150,
   },
   {
      field: 'value2',
      headerName: 'Value 2',
      width: 150,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 160,
      valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
   },
];
interface TableUIProps {
   rows: Array<{ id: number; label: string; value1: number; value2: number }>;
   loading?: boolean;
}
const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const arrLabels = ['A','B','C','D','E','F','G'];

export default function TableUI({ rows, loading = false }: TableUIProps) {


   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
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
}*/