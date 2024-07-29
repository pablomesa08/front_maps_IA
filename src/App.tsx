import React, { useState, useEffect } from 'react';
// Importacion de componentes
import { AppBar, Toolbar, Typography, FormGroup, FormControlLabel, Checkbox, Container, Button, ButtonGroup, TextField, Autocomplete, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
// Importacion para el uso de media query
import useMediaQuery from '@mui/material/useMediaQuery';
// Importacion de estilos
import './App.css';

// Interfaz para el manejo de las ubicaciones
interface Location {
  lat: number;
  lon: number;
  name: string;
}

// Funcion para simular un tiempo de espera
function sleepOrigin(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

// Funcion para simular un tiempo de espera
function sleepEnd(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function App() {
  // Variable para el uso de media query
  const matches = useMediaQuery('(max-width:600px)');

  // Variables de estado para el manejo de los checkbox 
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Variables de estado para el manejo de los botones
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);

  // Variables de estado para el manejo de origen y destino
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);

  // Variable de estado para el manejo de la imagen del mapa
  const [mapImage, setMapImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Funcion para el manejo de los checkbox al hacer click
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setSelectedCity(selectedCity === name ? null : name);
  };

  // Funcion para el manejo de los botones al hacer click
  const handleButtonClick = (buttonName: string) => {
    setSelectedTransport(selectedTransport === buttonName ? null : buttonName);
  };

  // Funcion para iniciar la búsqueda
  const handleStart = async () => {
    if (selectedCity && selectedTransport && origin && destination) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8000/render_map_with_data', {
          city_selected: selectedCity === 'medellin' ? 'Medellín, Antioquia, Colombia' : 'Envigado, Antioquia, Colombia',
          transport_mode_selected: selectedTransport,
          init_node: origin,
          final_node: destination,
        }, { responseType: 'blob' });

        const imageBlob = response.data;
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setMapImage(imageObjectURL);
      } catch (error) {
        console.error('Error fetching the map:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  // Variables de estado para el manejo de la apertura del origen
  const [openOrigin, setOpenOrigin] = useState(false);

  // Variables de estado para el manejo de las opciones de origen
  const [optionsOrigin, setOptionsOrigin] = useState<readonly Location[]>([]);

  // Varible de estado para la carga de la busqueda de origen
  const loadingOrigin = openOrigin && optionsOrigin.length === 0;

  // Variables de estado para el manejo de la apertura del destino
  const [openEnd, setOpenEnd] = useState(false);

  // Variables de estado para el manejo de las opciones de destino
  const [optionsEnd, setOptionsEnd] = useState<readonly Location[]>([]);

  // Varible de estado para la carga de la busqueda de destino
  const loadingEnd = openEnd && optionsEnd.length === 0;

  // Funcion para la busqueda de origen
  useEffect(() => {
    let active = true;

    if (!loadingOrigin) {
      return undefined;
    }

    (async () => {
      await sleepOrigin(1000);
      if (active) {
        setOptionsOrigin([...sampleLocations]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingOrigin]);

  useEffect(() => {
    if (!openOrigin) {
      setOptionsOrigin([]);
    }
  }, [openOrigin]);

  // Funcion para la busqueda de destino
  useEffect(() => {
    let active = true;

    if (!loadingEnd) {
      return undefined;
    }

    (async () => {
      await sleepEnd(1000);
      if (active) {
        setOptionsEnd([...sampleLocations]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingEnd]);

  useEffect(() => {
    if (!openEnd) {
      setOptionsEnd([]);
    }
  }, [openEnd]);

  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GEO TRACKER
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Container con el titulo, imagen y descripcion */}
      <Container sx={{ marginTop: 5, textAlign: 'center' }}>
        <div className='info'>
          <img src="/earth.svg" className='im-logo' alt="Logo" />
          <h1 className='title'>GEO TRACKER</h1>
          <p className='description'>¡Encontrar una ruta nunca fue tan fácil!, sigue estos 4 sencillos pasos y observa la magia de viajar!</p>
        </div>
      </Container>

      {/* Grid Container para los pasos a seguir */}
      <Container sx={{ marginTop: 3 }}>
        <Grid container spacing={4}>
          {/* Paso 1 */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className='step'>1. Selecciona la ciudad a evaluar:</Typography>
            <FormGroup row sx={{ justifyContent: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCity === 'medellin'}
                    onChange={handleCheckboxChange}
                    name="medellin"
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, color: '#2c3e50' }}
                  />
                }
                label="Medellín"
                sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Russo One', fontSize: '20px' } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCity === 'envigado'}
                    onChange={handleCheckboxChange}
                    name="envigado"
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, color: '#2c3e50' }}
                  />
                }
                label="Envigado"
                sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Russo One', fontSize: '20px' } }}
              />
            </FormGroup>
          </Grid>

          {/* Paso 2 */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className='step'>2. Selecciona tipo de transporte:</Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
              <Button
                onClick={() => handleButtonClick('walk')}
                sx={{
                  fontFamily: 'Russo One',
                  fontSize: 20,
                  color: '#ffffff',
                  backgroundColor: selectedTransport === 'walk' ? '#000000' : 'inherit',
                  '&:hover': {
                    backgroundColor: '#000000',
                  }
                }}
              >
                A pie
              </Button>
              <Button
                onClick={() => handleButtonClick('bike')}
                sx={{
                  fontFamily: 'Russo One',
                  fontSize: 20,
                  color: '#ffffff',
                  backgroundColor: selectedTransport === 'bike' ? '#000000' : 'inherit',
                  '&:hover': {
                    backgroundColor: '#000000',
                  }
                }}
              >
                Bicicleta
              </Button>
              <Button
                onClick={() => handleButtonClick('drive')}
                sx={{
                  fontFamily: 'Russo One',
                  fontSize: 20,
                  color: '#ffffff',
                  backgroundColor: selectedTransport === 'drive' ? '#000000' : 'inherit',
                  '&:hover': {
                    backgroundColor: '#000000',
                  }
                }}
              >
                Carro
              </Button>
            </ButtonGroup>

          </Grid>

          {/* Paso 3 */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className='step'>3. Selecciona origen:</Typography>
            <Autocomplete
              id="origin-autocomplete"
              sx={{ width: '100%', marginBottom: 3, backgroundColor: 'white' }}
              open={openOrigin}
              onOpen={() => setOpenOrigin(true)}
              onClose={() => setOpenOrigin(false)}
              isOptionEqualToValue={(option, value) => option.lat === value.lat && option.lon === value.lon}
              getOptionLabel={(option) => option.name}
              options={optionsOrigin}
              loading={loadingOrigin}
              onChange={(event, value) => setOrigin(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Origen"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loadingOrigin ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  sx={{ '& .MuiInputLabel-root': { color: 'black', fontFamily: 'Russo One', fontSize: 16 } }}
                />
              )}
            />
          </Grid>

          {/* Paso 4 */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className='step'>4. Selecciona destino:</Typography>
            <Autocomplete
              id="destination-autocomplete"
              sx={{ width: '100%', backgroundColor: 'white' }}
              open={openEnd}
              onOpen={() => setOpenEnd(true)}
              onClose={() => setOpenEnd(false)}
              isOptionEqualToValue={(option, value) => option.lat === value.lat && option.lon === value.lon}
              getOptionLabel={(option) => option.name}
              options={optionsEnd}
              loading={loadingEnd}
              onChange={(event, value) => setDestination(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destino"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loadingEnd ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  sx={{ '& .MuiInputLabel-root': { color: 'black', fontFamily: 'Russo One', fontSize: 16 } }}
                />
              )}
            />
          </Grid>

          {/* Botón de búsqueda */}
          <Grid item xs={12}>
            <Button
              onClick={handleStart}
              variant="contained"
              size="large"
              sx={{ fontFamily: 'Russo One', fontSize: 20, color: 'white', backgroundColor: '#2980b9' }}
              fullWidth
            >
              INICIAR
            </Button>
          </Grid>

          {/* Imagen del mapa */}
          <Grid item xs={12} className='im-con'>
            {loading ? (
              <CircularProgress size={50} />
            ) : (
              mapImage && <img src={mapImage} className='im' alt="mapa" />
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <footer className='footer'>
        <Container>
          <Typography variant="body1" align="center">
            © 2024 GEO TRACKER. Todos los derechos reservados.
          </Typography>
        </Container>
      </footer>
    </>
  );
}

export default App;

// Diccionario de ubicaciones de ejemplo
const sampleLocations = [
  { lat: 6.165695488417018, lon: -75.56775125876526, name: "Casa de Alejo" },
  { lat: 6.202594397242729, lon: -75.5554366508233, name: "Casa de Dennis" },
  { lat: 6.169272903825496, lon: -75.54688093511429, name: "Universidad EIA" },
];
