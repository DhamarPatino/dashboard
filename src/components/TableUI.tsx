import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

interface TableUIProps {
  loading: boolean;
  error: string | null;
  data: any;
}

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
  return arrLabels.map((label, index) => ({
    id: index,
    label: label,
    value1: arrValues1[index],
    value2: arrValues2[index]
  }));
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'label', headerName: 'Hora', width: 150 },
  { field: 'value1', headerName: 'Temperatura (°C)', width: 150 },
  { field: 'value2', headerName: 'Viento (km/h)', width: 150 },
  {
    field: 'resumen',
    headerName: 'Resumen',
    description: 'No es posible ordenar u ocultar esta columna.',
    sortable: false,
    hideable: false,
    width: 200,
    valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
  },
];

export default function TableUI({ loading, error, data }: TableUIProps) {
  if (loading) return <Typography>Cargando tabla...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!data) return null;

  // Ejemplo: usar los primeros 7 valores de temperatura y viento horario
  const arrLabels = data.hourly.time.slice(0, 7);
  const arrValues1 = data.hourly.temperature_2m.slice(0, 7);
  const arrValues2 = data.hourly.wind_speed_10m.slice(0, 7);

  const rows = combineArrays(arrLabels, arrValues1, arrValues2);

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