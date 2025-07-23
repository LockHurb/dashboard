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
      width: 60,
      sortable: true,
      type: 'number'
   },
   { 
      field: 'time', 
      headerName: 'Hora', 
      flex: 0.8,
      minWidth: 80,
      sortable: true
   },
   {
      field: 'temperature',
      headerName: 'Temp. (°C)',
      flex: 1,
      minWidth: 100,
      type: 'number'
   },
   {
      field: 'wind_speed',
      headerName: 'Viento (km/h)',
      flex: 1,
      minWidth: 100,
      type: 'number'
   },
   {
      field: 'resumen',
      headerName: 'Fecha',
      flex: 1.2,
      minWidth: 120,
      sortable: true
   }
];

export default function TableUI({ data }: TableUIProps) {

   const rows = data ? createTableRows(data) : [];

   return (
      <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
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
            autoHeight={false}
            sx={{
               height: '100%',
               width: '100%',
               '& .MuiDataGrid-root': {
                  border: 'none',
               },
               '& .MuiDataGrid-main': {
                  '& .MuiDataGrid-columnHeaders': {
                     backgroundColor: '#f5f5f5',
                     fontSize: '0.875rem',
                     fontWeight: 600,
                  },
                  '& .MuiDataGrid-cell': {
                     fontSize: '0.875rem',
                  },
               },
               '& .MuiDataGrid-footerContainer': {
                  backgroundColor: '#fafafa',
                  borderTop: '1px solid #e0e0e0',
                  minHeight: '52px'
               },
               '& .MuiDataGrid-virtualScroller': {
                  backgroundColor: '#fff',
               }
            }}
         />
      </Box>
   );
}