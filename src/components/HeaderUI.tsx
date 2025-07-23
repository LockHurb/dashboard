import { Typography, Box, Chip } from '@mui/material';
import type { City } from '../data/cities';

interface HeaderUIProps {
    city?: City;
}

export default function HeaderUI({ city }: HeaderUIProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
                sx={{
                    background: '#fff',
                    borderRadius: '18px',
                    boxShadow: '0 4px 18px 0 rgba(0,0,0,0.10)',
                    px: 5,
                    py: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 900,
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        color: '#1d5d8b',
                        mb: 2,
                        textShadow: '0 2px 4px rgba(0,0,0,0.08)',
                        textAlign: 'center',
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        fontWeight: 700,
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
                            background: 'rgba(163, 199, 224, 0.2)',
                            color: '#1d5d8b',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            px: 3,
                            py: 1.5,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid #a3c7e0',
                            height: 'auto',
                            mt: 1,
                            '& .MuiChip-label': {
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                px: 1,
                            },
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}