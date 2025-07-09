import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';

function App() {
   const dataFetcherOutput = DataFetcher();
   return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
         <Grid style={{ width: '100%' }}>
            <Grid container justifyContent="center" alignItems="center">
               <HeaderUI />
            </Grid>
         </Grid>

         {/* Contenido en una fila */}
         <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ width: '100%' }}>

            {/* Alertas */}
            <Grid>
               <AlertUI description="No se preveen lluvias" />
            </Grid>

            {/* Selector */}
            <Grid>
               <SelectorUI />
            </Grid>

            {/* Indicadores */}
            <Grid container size={{ xs: 12, md: 9 }} >

                 {/* Estado de carga */}
                 {dataFetcherOutput.loading && (
                     <Grid size={{ xs: 12 }}>
                         <p>Cargando datos...</p>
                     </Grid>
                 )}

                 {/* Estado de error */}
                 {dataFetcherOutput.error && (
                     <Grid size={{ xs: 12 }}>
                         <p style={{ color: 'red' }}>Error: {dataFetcherOutput.error}</p>
                     </Grid>
                 )}

                 {/* Datos obtenidos exitosamente */}
                 {dataFetcherOutput.data && !dataFetcherOutput.loading && !dataFetcherOutput.error && (
                 <>
                     {/* Indicadores con datos obtenidos */}
                     <Grid size={{ xs: 12, md: 3 }} >
                         <IndicatorUI
                             title='Temperatura (2m)'
                             description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura aparente'
                             description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Velocidad del viento'
                             description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Humedad relativa'
                             description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
                     </Grid>
                 </>
                 )}

            </Grid>

            {/* Gráfico */}
            <Grid>
               Elemento: Gráfico
            </Grid>

            {/* Tabla */}
            <Grid>
               Elemento: Tabla
            </Grid>

            {/* Información adicional */}
            <Grid>
               Elemento: Información adicional
            </Grid>

         </Grid>

      </Grid>
   );
}

export default App;

