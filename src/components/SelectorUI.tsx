import { FormControl, InputLabel, MenuItem, TextField, Button, Box, Typography } from '@mui/material';
import { Map as MapIcon } from '@mui/icons-material';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

interface Location {
  lat: number;
  lon: number;
  name: string;
}

interface SelectorUIProps {
  onCityChange: (location: Location) => void;
}

const predefinedLocations: Location[] = [
  { lat: -2.170998, lon: -79.922359, name: 'Guayaquil' },
  { lat: -0.180653, lon: -78.467834, name: 'Quito' },
  { lat: -0.967653, lon: -80.708911, name: 'Manta' },
  { lat: -2.90055, lon: -79.00453, name: 'Cuenca' },
];

export default function SelectorUI({ onCityChange }: SelectorUIProps) {
  const [cityInput, setCityInput] = useState('');
  const [customLat, setCustomLat] = useState('');
  const [customLon, setCustomLon] = useState('');
  const [customName, setCustomName] = useState('');

  // Manejo de ciudad predefinida seleccionada
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCity = event.target.value;
    setCityInput(selectedCity);

    const city = predefinedLocations.find(c => c.name === selectedCity);
    if (city) {
      // Autocompletar campos
      setCustomLat(city.lat.toString());
      setCustomLon(city.lon.toString());
      setCustomName(city.name);
      onCityChange(city); // Si quieres que se aplique automáticamente al seleccionar
    }
  };

  // Aplicar coordenadas personalizadas
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

  // Obtener ubicación actual
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: 'Mi ubicación actual'
          };
          setCityInput('');
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

return (
  <Box
    sx={{
      mt: 2,
      backgroundColor: '#e6f3fc',
      p: 4,
      borderRadius: 4,
      boxShadow: 2
    }}
  >
    {/* Título e ícono */}
    <Box display="flex" alignItems="center" gap={1} mb={3}>
      <Typography variant="h6" fontWeight="bold" color="text.primary">
        🌤️ 📍 Selecciona tu Ubicación
      </Typography>
    </Box>

    {/* Ciudad predefinida + ubicación actual */}
    <Box
      display="grid"
      gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
      gap={2}
      mb={3}
    >
      {/* Ciudad */}
      <FormControl fullWidth>
        <InputLabel id="city-select-label">Ciudad</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-simple-select"
          value={cityInput}
          label="Ciudad"
          onChange={handleChange}
        >
          <MenuItem value=""><em>Seleccione una ciudad</em></MenuItem>
          {predefinedLocations.map((loc) => (
            <MenuItem key={loc.name} value={loc.name}>{loc.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Botón ubicación actual */}
      <Button
        variant="outlined"
        startIcon={<MapIcon />}
        onClick={getCurrentLocation}
        fullWidth
        sx={{ height: '56px', borderColor: '#0288d1', color: '#0288d1' }}
      >
        Usar mi ubicación actual
      </Button>
    </Box>

    {/* Coordenadas personalizadas */}
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

    {/* Pie */}
    <Typography variant="caption" mt={2} color="text.secondary">
      Ejemplo: Latitud: 40.7128, Longitud: -74.0060 (Nueva York)
    </Typography>
  </Box>
);
}