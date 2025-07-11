import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
   data?: OpenMeteoResponse | null;
}

export default function ChartUI({ data }: ChartUIProps) {
   
   if (!data?.hourly) {
      return (
         <>
            <Typography variant="h5" component="div">
               Tiempo vs Temperatura 2m (°C) & Velocidad del Viento 10m (km/h)
            </Typography>
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Typography>No hay datos disponibles</Typography>
            </div>
         </>
      );
   }

   // Procesar los datos para el gráfico (mostrar solo las próximas 24 horas)
   const next24Hours = 24;
   const timeLabels = data.hourly.time.slice(0, next24Hours).map(time => {
      const date = new Date(time);
      return date.getHours().toString().padStart(2, '0') + 'h';
   });
   
   const temperatureData = data.hourly.temperature_2m.slice(0, next24Hours);
   const windSpeedData = data.hourly.wind_speed_10m.slice(0, next24Hours);

   return (
      <>
         <Typography variant="h5" component="div" style={{ marginBottom: '16px' }}>
            Tiempo vs Temperatura 2m (°C) & Velocidad del Viento 10m (km/h)
         </Typography>
         <LineChart
            height={350}
            series={[
               { 
                  data: temperatureData, 
                  label: `Temperatura (${data.current_units.temperature_2m})`,
                  color: '#1976d2'
               },
               { 
                  data: windSpeedData, 
                  label: `Viento (${data.current_units.wind_speed_10m})`,
                  color: '#2e7d32'
               },
            ]}
            xAxis={[{ scaleType: 'point', data: timeLabels }]}
            margin={{ left: 60, right: 60, top: 30, bottom: 60 }}
         />
      </>
   );
}