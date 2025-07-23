import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
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

    const selectedCityKey = Object.keys(cities).find(
        key => cities[key].name === selectedCity.name
    ) || '';

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                🌍 Seleccionar Ciudad
            </Typography>
            
            <FormControl fullWidth>
                <InputLabel id="city-select-label">Ciudad</InputLabel>
                <Select
                    labelId="city-select-label"
                    id="city-simple-select"
                    label="Ciudad"
                    onChange={handleChange}
                    value={selectedCityKey}
                    sx={{
                        borderRadius: 2,
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: 'primary.main',
                            },
                        },
                    }}
                >
                    {Object.keys(cities).map((cityKey) => (
                        <MenuItem key={cityKey} value={cityKey}>
                            📍 {cities[cityKey].name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            <Box sx={{ 
                mt: 2, 
                p: 2, 
                background: 'linear-gradient(45deg, #f8fafc, #e2e8f0)',
                borderRadius: 2,
                textAlign: 'center'
            }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    Mostrando datos de:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {selectedCity.name}
                </Typography>
            </Box>
        </Box>
    );
}