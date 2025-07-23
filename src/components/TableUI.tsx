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
    renderCell: (params) => params.value,
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
      elevation={6}
      sx={{
        borderRadius: 4,
        p: 3,
        background: 'rgba(186,230,253,0.85)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        backdropFilter: 'blur(8px)',
        color: '#0369a1',
        maxWidth: 900,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#0ea5e9',
          mb: 2,
          userSelect: 'none',
          textShadow: '0 1px 2px rgba(255,255,255,0.5)',
          letterSpacing: 1,
        }}
      >
        📋 Datos Horarios de Clima
      </Typography>
      <Box
        sx={{
          height: 420,
          width: '100%',
          bgcolor: 'rgba(255,255,255,0.7)',
          borderRadius: 3,
          '& .MuiDataGrid-root': {
            border: 'none',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            background: 'transparent',
          },
          '& .MuiDataGrid-columnHeaders': {
            background: 'linear-gradient(90deg, #38bdf8 0%, #bae6fd 100%)',
            color: '#0369a1',
            fontWeight: '700',
            fontSize: '1rem',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            zIndex: 1,
          },
          '& .MuiDataGrid-row': {
            background: 'rgba(255,255,255,0.6)',
            borderRadius: 2,
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(2, 136, 209, 0.13)',
          },
          '& .temperature-cell': {
            color: '#f59e42',
            fontWeight: 700,
          },
          '& .wind-cell': {
            color: '#0ea5e9',
            fontWeight: 700,
          },
          '& .humidity-cell': {
            color: '#0284c7',
            fontWeight: 700,
          },
          '& .MuiDataGrid-cell': {
            color: '#0369a1',
            fontSize: 16,
          },
          '& .MuiDataGrid-footerContainer': {
            background: 'linear-gradient(90deg, #bae6fd 0%, #e0f2fe 100%)',
            color: '#0369a1',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          },
          '& .MuiPaginationItem-root': {
            color: '#0ea5e9',
            fontWeight: '600',
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#0ea5e9',
            color: 'white',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
          sx={{ borderRadius: 3 }}
        />
      </Box>
    </Paper>
  );
}
