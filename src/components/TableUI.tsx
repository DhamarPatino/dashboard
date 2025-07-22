'use client';

import { Box, Paper, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
  loading: boolean;
  error: string | null;
  data: OpenMeteoResponse | null;
}

interface RowData {
  id: number;
  time: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
}

const columns: GridColDef[] = [
  {
    field: 'time',
    headerName: '🕒 Fecha y Hora',
    width: 180,
    renderCell: (params) => params.value, // mostrar tal cual
  },
  {
    field: 'temperature',
    headerName: '🌡️ Temperatura (°C)',
    width: 160,
    cellClassName: 'temperature-cell',
    renderCell: (params) => <span>🌡️ {params.value}°C</span>,
  },
  {
    field: 'windSpeed',
    headerName: '🌬️ Viento (km/h)',
    width: 140,
    cellClassName: 'wind-cell',
    renderCell: (params) => <span>🌬️ {params.value} km/h</span>,
  },
  {
    field: 'humidity',
    headerName: '💧 Humedad (%)',
    width: 130,
    cellClassName: 'humidity-cell',
    renderCell: (params) => <span>💧 {params.value}%</span>,
  },
  {
    field: 'summary',
    headerName: '📋 Resumen',
    description: 'Combinación de temperatura, viento y humedad',
    sortable: false,
    filterable: false,
    width: 300,
    renderCell: (params) => {
      const { temperature, windSpeed, humidity } = params.row;
      return (
        <span>
          🌡️ {temperature}°C, 🌬️ {windSpeed} km/h, 💧 {humidity}%
        </span>
      );
    },
  },
];

export default function TableUI({ loading, error, data }: TableUIProps) {
  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          Cargando tabla...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!data || !data.hourly) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          No hay datos disponibles.
        </Typography>
      </Box>
    );
  }

  const length = Math.min(
    data.hourly.time.length,
    data.hourly.temperature_2m.length,
    data.hourly.wind_speed_10m.length,
    data.hourly.relative_humidity_2m.length,
    10
  );

  const rows: RowData[] = [];
  for (let i = 0; i < length; i++) {
    rows.push({
      id: i,
      time: data.hourly.time[i],
      temperature: Math.round(data.hourly.temperature_2m[i]),
      windSpeed: Math.round(data.hourly.wind_speed_10m[i]),
      humidity: Math.round(data.hourly.relative_humidity_2m[i]),
    });
  }

  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: 3,
        p: 2,
        background: 'linear-gradient(135deg, #e0f7fa, #80deea)',
        backdropFilter: 'blur(8px)',
        color: '#006064',
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#004d40',
          mb: 2,
          userSelect: 'none',
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.6)',
        }}
      >
        📋 Datos Horarios de Clima
      </Typography>
      <Box
        sx={{
          height: 300,
          width: '100%',
          bgcolor: 'white',
          borderRadius: 2,
          '& .MuiDataGrid-root': {
            border: 'none',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#222',
            color: '#827f7f',
            fontWeight: '700',
            fontSize: '1rem',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            zIndex: 1,             // importante para que se vea sobre otras capas
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(2, 136, 209, 0.15)',
          },
          '& .temperature-cell': {
            color: '#f97316',
            fontWeight: 700,
          },
          '& .wind-cell': {
            color: '#0288d1',
            fontWeight: 700,
          },
          '& .humidity-cell': {
            color: '#01579b',
            fontWeight: 700,
          },
          '& .MuiDataGrid-cell': {
            color: '#004d40',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#b3e5fc',
            color: '#004d40',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          },
          '& .MuiPaginationItem-root': {
            color: '#0288d1',
            fontWeight: '600',
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#01579b',
            color: 'white',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          disableRowSelectionOnClick
          sx={{ borderRadius: 2 }}
        />
      </Box>
    </Paper>
  );
}
