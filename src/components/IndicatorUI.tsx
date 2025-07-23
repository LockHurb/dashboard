import { Card, CardContent, Typography, Box } from '@mui/material';

interface IndicatorUIProps {
    title: string;
    description: string;
}

export default function IndicatorUI({ title, description }: IndicatorUIProps) {
    return (
        <Card sx={{ 
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-4px)',
            }
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
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}