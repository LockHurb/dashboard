import { Card, CardContent, Typography } from '@mui/material';

interface IndicatorUIProps {
    title: string;
    description: string;
}

export default function IndicatorUI({ title, description }: IndicatorUIProps) {
    return (
        <Card sx={{ 
            height: '100%',
            background: '#fff',
            color: '#222',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            // Eliminada la animación y el hover
        }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        mb: 2, 
                        fontSize: '1rem',
                        fontWeight: 500,
                        opacity: 0.9 
                    }}
                >
                    {title}
                </Typography>
                
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 700,
                        fontSize: '2rem',
                        textShadow: '0 2px 4px rgba(0,0,0,0.08)'
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}