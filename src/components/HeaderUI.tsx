import Typography from '@mui/material/Typography';
import type { City } from '../data/cities';

interface HeaderUIProps {
    city?: City;
}

export default function HeaderUI({ city }: HeaderUIProps) {
    return (
        <>
            <Typography
                variant="h2"
                component="h1"
                sx={{fontWeight: 'bold'}}>
                Dashboard del Clima
            </Typography>
            {city && (
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{fontWeight: 'normal', color: 'text.secondary', textAlign: 'center'}}>
                    {city.name}
                </Typography>
            )}
        </>
    );
}