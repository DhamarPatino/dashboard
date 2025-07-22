import { Autocomplete, TextField, Button, Box, Typography } from '@mui/material';
import { Map as MapIcon } from '@mui/icons-material';
import { useState } from 'react';
import type { Location } from '../functions/Locations.tsx';
import type {} from 'react';

interface SelectorUIProps {
  locations: Location[];
  onCityChange: (location: Location) => void;
}

export default function SelectorUI({ locations, onCityChange }: SelectorUIProps) {
  const [inputValue, setInputValue] = useState('');
  const [customLat, setCustomLat] = useState('');
  const [customLon, setCustomLon] = useState('');
  const [customName, setCustomName] = useState('');

  const filteredOptions = locations.filter(loc =>
    loc.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (_: any, value: Location | null) => {
    if (value) {
      setCustomLat(value.lat.toString());
      setCustomLon(value.lon.toString());
      setCustomName(value.name);
      onCityChange(value);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: 'Mi ubicación actual'
          };
          setCustomLat(location.lat.toString());
          setCustomLon(location.lon.toString());
          setCustomName(location.name);
          onCityChange(location);
        },
        () => {
          alert("No se pudo obtener tu ubicación actual");
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización");
    }
  };

  const handleCustomLocation = () => {
    const lat = parseFloat(customLat);
    const lon = parseFloat(customLon);

    if (isNaN(lat) || isNaN(lon)) {
      alert("Por favor ingresa coordenadas válidas");
      return;
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      alert("Las coordenadas están fuera del rango válido");
      return;
    }

    const customLocation = {
      lat,
      lon,
      name: customName || `${lat.toFixed(2)}, ${lon.toFixed(2)}`
    };

    onCityChange(customLocation);
  };

  return (
    <Box sx={{ mt: 2, backgroundColor: '#e6f3fc', p: 4, borderRadius: 4, boxShadow: 2 }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Autocomplete
          options={filteredOptions}
          getOptionLabel={(option) => option.name}
          inputValue={inputValue}
          onInputChange={(_, value) => setInputValue(value)}
          onChange={handleSelect}
          renderInput={(params) => (
            <TextField {...params} label="Ciudad, país o lugar" variant="outlined" fullWidth />
          )}
          sx={{ flex: 1 }}
        />
        <Button
          variant="outlined"
          startIcon={<MapIcon />}
          onClick={getCurrentLocation}
          sx={{
            height: '56px',
            borderColor: '#0288d1',
            color: '#0288d1',
            minWidth: 180,
            whiteSpace: 'nowrap'
          }}
        >
          Usar mi ubicación actual
        </Button>
      </Box>

      <Typography variant="subtitle1" fontWeight="medium" mb={1}>
        Coordenadas personalizadas
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr auto' }}
        gap={2}
        alignItems="center"
      >
        <TextField
          label="Latitud"
          value={customLat}
          onChange={(e) => setCustomLat(e.target.value)}
          type="number"
          fullWidth
        />
        <TextField
          label="Longitud"
          value={customLon}
          onChange={(e) => setCustomLon(e.target.value)}
          type="number"
          fullWidth
        />
        <TextField
          label="Nombre (opcional)"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleCustomLocation}
          sx={{ height: '56px', minWidth: 120 }}
        >
          Aplicar
        </Button>
      </Box>

      <Typography variant="caption" mt={2} color="text.secondary">
        Ejemplo: Latitud: 40.7128, Longitud: -74.0060 (Nueva York)
      </Typography>
    </Box>
  );
}