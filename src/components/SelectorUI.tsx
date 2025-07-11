import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { cities } from '../data/cities';
import type { City } from '../data/cities';

interface SelectorUIProps {
    onCityChange: (city: City) => void;
    selectedCity: City;
}

export default function SelectorUI({ onCityChange, selectedCity }: SelectorUIProps) {

    const handleChange = (event: SelectChangeEvent<string>) => {
        const cityKey = event.target.value;
        const city = cities[cityKey];
        if (city) {
            onCityChange(city);
        }
    };

    // Encontrar la clave de la ciudad seleccionada
    const selectedCityKey = Object.keys(cities).find(
        key => cities[key].name === selectedCity.name
    ) || '';

    return (
        <FormControl fullWidth>
            <InputLabel id="city-select-label">Ciudad</InputLabel>
            <Select
                labelId="city-select-label"
                id="city-simple-select"
                label="Ciudad"
                onChange={handleChange}
                value={selectedCityKey}
            >
                <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
                <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
                <MenuItem value={"quito"}>Quito</MenuItem>
                <MenuItem value={"manta"}>Manta</MenuItem>
                <MenuItem value={"cuenca"}>Cuenca</MenuItem>
            </Select>
            {selectedCity && (
                <p style={{ marginTop: '8px', textAlign: 'center' }}>
                    Información del clima en <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{selectedCity.name}</span>
                </p>
            )}
        </FormControl>
    );
}