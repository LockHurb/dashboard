import { Typography, Box, Chip } from '@mui/material';
import type { City } from '../data/cities';

interface HeaderUIProps {
    city?: City;
}

export default function HeaderUI({ city }: HeaderUIProps) {
    return (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
                variant="h1"
                sx={{
                    background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                ☀️ Dashboard Meteorológico
            </Typography>
            
            {city && (
                <Chip
                    label={`📍 ${city.name}, Ecuador`}
                    variant="filled"
                    size="medium"
                    sx={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        px: 3,
                        py: 1.5,
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        height: 'auto', // Permite que crezca con el contenido
                        '& .MuiChip-label': {
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            px: 1,
                        },
                    }}
                />
            )}
        </Box>
    );
}