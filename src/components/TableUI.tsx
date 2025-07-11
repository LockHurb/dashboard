import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
   data?: OpenMeteoResponse | null;
}

function createTableRows(data: OpenMeteoResponse) {
   if (!data?.hourly) return [];
   
   return data.hourly.time.map((time, index) => {
      const temperature = data.hourly.temperature_2m[index];
      const windSpeed = data.hourly.wind_speed_10m[index];
      
      // Crear resumen basado en temperatura y viento
      let resumen = '';
      if (temperature < 10) {
         resumen = 'Frío';
      } else if (temperature < 20) {
         resumen = 'Fresco';
      } else if (temperature < 25) {
         resumen = 'Agradable';
      } else if (temperature < 30) {
         resumen = 'Cálido';
      } else {
         resumen = 'Caluroso';
      }
      
      if (windSpeed > 20) {
         resumen += ' - Ventoso';
      } else if (windSpeed > 10) {
         resumen += ' - Brisa';
      }
      
      return {
         id: index + 1,
         time: new Date(time).toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
         }),
         temperature: temperature,
         wind_speed: windSpeed,
         resumen: new Date(time).toLocaleDateString('sv-SE') // formato aaaa-mm-dd
      };
   });
}

const columns: GridColDef[] = [
   { 
      field: 'id', 
      headerName: 'ID', 
      width: 80,
      sortable: true,
      type: 'number'
   },
   { 
      field: 'time', 
      headerName: 'Hora', 
      width: 150,
      sortable: true
   },
   {
      field: 'temperature',
      headerName: 'Temperatura 2m (°C)',
      width: 160,
      type: 'number'
   },
   {
      field: 'wind_speed',
      headerName: 'Viento (km/h)',
      width: 130,
      type: 'number'
   },
   {
      field: 'resumen',
      headerName: 'Fecha (aaaa-mm-dd)',
      width: 150,
      sortable: true
   }
];

export default function TableUI({ data }: TableUIProps) {

   const rows = data ? createTableRows(data) : [];

   return (
      <Box sx={{ height: 400, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 10,
                  },
               },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            loading={!data}
         />
      </Box>
   );
}