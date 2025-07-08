import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

interface Coordinates {
  lat: number;
  lon: number;
}

interface SelectorUIProps {
  onCityChange: (coords: Coordinates) => void;
}

const cityCoordinates = {
  guayaquil: { lat: -2.1962, lon: -79.8862 },
  quito: { lat: -0.180653, lon: -78.467834 },
  manta: { lat: -0.967653, lon: -80.708911 },
  cuenca: { lat: -2.90055, lon: -79.00453 }
};

export default function SelectorUI({ onCityChange }: SelectorUIProps) {
  const [cityInput, setCityInput] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedCity = event.target.value;
    setCityInput(selectedCity);

    const coords = cityCoordinates[selectedCity as keyof typeof cityCoordinates];
    if (coords) {
      onCityChange(coords); // envías lat/lon al padre
    }
  };
return (
   <FormControl fullWidth>
    
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
         labelId="city-select-label"
         id="city-simple-select"
         label="Ciudad"
         onChange={handleChange} 
         value={cityInput}>


         <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
         <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
         <MenuItem value={"quito"}>Quito</MenuItem>
         <MenuItem value={"manta"}>Manta</MenuItem>
         <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>
        {cityInput && (
            <p>
                Información del clima en <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{cityInput}</span>
            </p>
        )}
   </FormControl>
   )
}