import React, { useState } from 'react';
//Importacion de componentes
import { FormGroup, FormControlLabel, Checkbox, Container, Button, ButtonGroup, TextField, Autocomplete, CircularProgress } from '@mui/material';
//Importacion para el uso de media query
import useMediaQuery from '@mui/material/useMediaQuery';
//Importacion de estilos
import './App.css';

//Interfaz para el manejo de las peliculas
interface Film {
  title: string;
  year: number;
}

//Funcion para simular un tiempo de espera
function sleepOrigin(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

//Funcion para simular un tiempo de espera
function sleepEnd(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function App() {
  //Variable para el uso de media query
  const matches = useMediaQuery('(max-width:600px)');

  //Variables de estado para el manejo de los checkbox 
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);

  //Variables de estado para el manejo de los botones
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  //Variables para manejo de boton de inicio
  const [start, setStart] = useState<string | null>(null);

  //Funcion para el manejo de los checkbox al hacer click
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setSelectedCheckbox(selectedCheckbox === name ? null : name);
  };

  //Funcion para el manejo de los botones al hacer click
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(selectedButton === buttonName ? null : buttonName);
  };

  //Funcion para el manejo del boton de inicio
  const handleStart = (buttonName: string) => {
    setStart(start === buttonName ? null : buttonName);
  };

  //Variables de estado para el manejo de la apertura del origen
  const [openOrigin, setOpenOrigin] = React.useState(false);

  //Variables de estado para el manejo de las opciones de origen
  const [optionsOrigin, setOptionsOrigin] = React.useState<readonly Film[]>([]);

  //Varible de estado para la carga de la busqueda de origen
  const loadingOrigin = openOrigin && optionsOrigin.length === 0;

  //Variables de estado para el manejo de la apertura del origen
  const [openEnd, setOpenEnd] = React.useState(false);

  //Variables de estado para el manejo de las opciones de origen
  const [optionsEnd, setOptionsEnd] = React.useState<readonly Film[]>([]);

  //Varible de estado para la carga de la busqueda de origen
  const loadingEnd = openEnd && optionsEnd.length === 0;

  //Funcion para la busqueda de origen
  React.useEffect(() => {
    let active = true;

    if (!loadingOrigin) {
      return undefined;
    }

    (async () => {
      await sleepOrigin(1000); 
      if (active) {
        setOptionsOrigin([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingOrigin]);

  React.useEffect(() => {
    if (!openOrigin) {
      setOptionsOrigin([]);
    }
  }, [openOrigin]);

  //Funcion para la busqueda de destino
  React.useEffect(() => {
    let active = true;

    if (!loadingEnd) {
      return undefined;
    }

    (async () => {
      await sleepEnd(1000); 
      if (active) {
        setOptionsEnd([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingEnd]);

  React.useEffect(() => {
    if (!openEnd) {
      setOptionsEnd([]);
    }
  }, [openEnd]);

  return (
    <>
      {/*Container con el titulo, imagen y descripcion*/}
      <Container sx={{ display: 'inline-block', alignItems: 'center', justifyContent: 'center', flexDirection: matches ? 'column' : 'row' }}>
        <div className='info'>
          <h1 className='tittle'>GEO TRACKER</h1>
          <img src="/earth.svg" className='im-logo' alt="Logo" />
        </div>
        <div>
          <p className='description'>¡Encontrar una ruta nunca fue tan fácil! Sigue estos 4 sencillos pasos y observa la magia de viajar</p>
        </div>
      </Container>

      {/*Container para los pasos a seguir*/}
      <Container sx={{marginLeft: 3}}>
        <div className='general'>
          {/*Div para pasos 1, 3*/}
          <div className='second'>
            <h1 className='step'>1. Selecciona la ciudad a evaluar: </h1>
            {/*FormGroup para elegir ciudad*/}
            <FormGroup sx={{ alignItems: 'center', flexDirection: 'row', color: 'white' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCheckbox === 'medellin'}
                    onChange={handleCheckboxChange}
                    name="medellin"
                    sx={{ 
                      '& .MuiSvgIcon-root': { fontSize: 28 },
                      color: 'white',
                      '&.Mui-checked': { color: 'white' }
                    }}
                  />
                }
                label="Medellín"
                sx={{ 
                  '& .MuiFormControlLabel-label': {
                    fontFamily: 'Russo One',
                    fontSize: '20px',
                  },
                  marginRight: 5
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCheckbox === 'envigado'}
                    onChange={handleCheckboxChange}
                    name="envigado"
                    sx={{ 
                      '& .MuiSvgIcon-root': { fontSize: 28 },
                      color: 'white',
                      '&.Mui-checked': { color: 'white' }
                    }}
                  />
                }
                label="Envigado"
                sx={{ 
                  '& .MuiFormControlLabel-label': {
                    fontFamily: 'Russo One',
                    fontSize: '20px',
                  }
                }}
              />
            </FormGroup>
            <h1 className='step'>3. Selecciona origen y destino: </h1>

            {/*Autocomplete para seleccionar origen*/}
            <Autocomplete
              id="asynchronous-demo"
              sx={{ width: 300, marginBottom: 3, backgroundColor: 'white' }}
              open={openOrigin}
              onOpen={() => {
                setOpenOrigin(true);
              }}
              onClose={() => {
                setOpenOrigin(false);
              }}
              isOptionEqualToValue={(option, value) => option.title === value.title}
              getOptionLabel={(option) => option.title}
              options={optionsOrigin}
              loading={loadingOrigin}
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
                  sx={{
                    '& .MuiInputLabel-root': { color: 'black', fontFamily: 'Russo One', fontSize: 16 },
                  }}
                />
              )}
            />

            {/*Autocomplete para seleccionar destino*/}
            <Autocomplete
              id="asynchronous-demo"
              sx={{ width: 300, backgroundColor: 'white' }}
              open={openEnd}
              onOpen={() => {
                setOpenEnd(true);
              }}
              onClose={() => {
                setOpenEnd(false);
              }}
              isOptionEqualToValue={(option, value) => option.title === value.title}
              getOptionLabel={(option) => option.title}
              options={optionsEnd}
              loading={loadingEnd}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destino"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loadingEnd ? <CircularProgress color="primary" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  sx={{
                    '& .MuiInputLabel-root': { color: 'black', fontFamily: 'Russo One', fontSize: 16 },
                  }}
                />
              )}
            />
          </div>
          {/*Div para pasos 2 y 4*/}
          <div>
            <h1 className='step'>2. Selecciona tipo de transporte: </h1>

            {/*ButtonGroup para seleccionar tipo de transporte*/}
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button
                onClick={() => handleButtonClick('aPie')} 
                sx={{ 
                  fontFamily: 'Russo One', 
                  fontSize: 20, 
                  color: 'white',
                  backgroundColor: selectedButton === 'aPie' ? 'black' : 'default',
                }}
                >
                  A pie</Button>
              <Button
                onClick={() => handleButtonClick('bicicleta')} 
                sx={{ 
                  fontFamily: 'Russo One', 
                  fontSize: 20, 
                  color: 'white',
                  backgroundColor: selectedButton === 'bicicleta' ? 'black' : 'default',
                }}
                >Bicicleta</Button>
              <Button
                onClick={() => handleButtonClick('carro')} 
              sx={{ 
                fontFamily: 'Russo One', 
                fontSize: 20, 
                color: 'white',
                backgroundColor: selectedButton === 'carro' ? 'black' : 'default', 
              }}
              >Carro</Button>
            </ButtonGroup>
            <h1 className='step'>4. Vamos a buscar: </h1>

            {/*Button para iniciar la busqueda*/}
            <Button 
              onClick={() => handleStart('iniciar')} 
              variant="contained" 
              size='large'
              sx={{
                fontFamily: 'Russo One',
                fontSize: 20,
                color: 'white',
                backgroundColor: start === 'iniciar' ? 'black' : 'default',
              }}
            >
              INICIAR</Button>
          </div>
          {/*Div para la imagen */}
          <div className='im-con'>
            <img src="/earth.svg" className='im' alt="mapa" />
          </div>
        </div>
      </Container>
    </>
  );
}
export default App;

//Diccionario de peliculas
const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];