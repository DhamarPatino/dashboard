import { FormControl, InputLabel, MenuItem, Box, Typography } from '@mui/material';
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

  const [customName, setCustomName] = useState('');
  if(customName === '') {}

  // Manejo de ciudad predefinida seleccionada
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCity = event.target.value;
    setCityInput(selectedCity);

    const city = predefinedLocations.find(c => c.name === selectedCity);
    if (city) {
      // Autocompletar campos

      setCustomName(city.name);
      onCityChange(city); // Si quieres que se aplique automáticamente al seleccionar
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
        </Box>
        </Box>
);
}