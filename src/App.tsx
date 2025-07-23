import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Paper, Fade, Typography } from '@mui/material';
import { useState } from 'react';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcherWithCache from './functions/DataFetcherWithCache';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { getDefaultCity } from './data/cities';
import type { City } from './data/cities';
import { theme } from './theme/theme';
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState<City>(getDefaultCity());
  const dataFetcherOutput = DataFetcherWithCache({
    city: selectedCity,
    cacheTimeMinutes: 15,
  });

  const handleCityChange = (city: City) => setSelectedCity(city);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="main-container">
        {/* Header */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4 }}>
            <HeaderUI city={selectedCity} />
          </Box>
        </Fade>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: '100%', md: '300px' },
              minWidth: { md: '300px' },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Fade in timeout={1000}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <SelectorUI onCityChange={handleCityChange} selectedCity={selectedCity} />
                </Paper>
              </Fade>

              <Fade in timeout={1200}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                  <AlertUI description="No se preveen lluvias" />
                </Paper>
              </Fade>

              {dataFetcherOutput.isFromCache && !dataFetcherOutput.error && (
                <Fade in timeout={600}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, borderRadius: 3, background: 'linear-gradient(45deg, #e3f2fd, #f3e5f5)', border: '1px solid #2196f3' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ fontSize: '1.2rem' }}>📦</Box>
                      <Box sx={{ fontSize: '0.9rem', color: '#1976d2', fontWeight: 500 }}>
                        Datos del cache local
                      </Box>
                    </Box>
                  </Paper>
                </Fade>
              )}
            </Box>
          </Box>

          {/* Main Content Area */}
          <Box sx={{ flex: 1 }}>
            {/* Loading State */}
            {dataFetcherOutput.loading && (
              <Fade in timeout={400}>
                <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                  <Box sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                    🌤️ Cargando datos meteorológicos...
                  </Box>
                </Paper>
              </Fade>
            )}

            {/* Error State */}
            {dataFetcherOutput.error && (
              <Fade in timeout={400}>
                <Paper
                  elevation={2}
                  sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(45deg, #ffebee, #fce4ec)', border: '1px solid #f44336' }}
                >
                  <Box sx={{ color: '#d32f2f', fontWeight: 500 }}>
                    ⚠️ {dataFetcherOutput.error}
                  </Box>
                </Paper>
              </Fade>
            )}

            {/* Weather Indicators */}
            {dataFetcherOutput.data && !dataFetcherOutput.loading && (
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      lg: 'repeat(4, 1fr)',
                    },
                    gap: 3,
                  }}
                >
                  {[
                    {
                      title: '🌡️ Temperatura',
                      value: `${dataFetcherOutput.data.current.temperature_2m}${dataFetcherOutput.data.current_units.temperature_2m}`,
                    },
                    {
                      title: '🌡️ Sensación Térmica',
                      value: `${dataFetcherOutput.data.current.apparent_temperature}${dataFetcherOutput.data.current_units.apparent_temperature}`,
                    },
                    {
                      title: '💨 Viento',
                      value: `${dataFetcherOutput.data.current.wind_speed_10m} ${dataFetcherOutput.data.current_units.wind_speed_10m}`,
                    },
                    {
                      title: '💧 Humedad',
                      value: `${dataFetcherOutput.data.current.relative_humidity_2m}${dataFetcherOutput.data.current_units.relative_humidity_2m}`,
                    },
                  ].map((indicator, idx) => (
                    <Fade in timeout={1000 + idx * 200} key={idx}>
                      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        <IndicatorUI title={indicator.title} description={indicator.value} />
                      </Paper>
                    </Fade>
                  ))}
                </Box>
              </Box>
            )}

            {/* Charts and Table */}
            {dataFetcherOutput.data && !dataFetcherOutput.loading && (
              <div className="dashboard-panels">
                <Fade in timeout={1800}>
                  <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%', minHeight: '600px' }}>
                    <ChartUI data={dataFetcherOutput.data} />
                  </Paper>
                </Fade>

                <Fade in timeout={2000}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      p: 1, 
                      borderRadius: 3, 
                      height: '100%', 
                      minHeight: '600px', 
                      display: 'flex', 
                      flexDirection: 'column',
                      overflow: 'hidden'
                    }}
                  >
                    <TableUI data={dataFetcherOutput.data} />
                  </Paper>
                </Fade>
              </div>
            )}
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;