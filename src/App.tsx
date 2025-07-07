import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';

function App() {
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
            <Grid>
               Elemento: Indicadores
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

