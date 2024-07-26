import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import './App.css';

function App() {
  const matches = useMediaQuery('(max-width:600px)');
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setSelectedCheckbox(selectedCheckbox === name ? null : name);
  };

  return (
    <>
      <Container sx={{ display: 'inline-block', alignItems: 'center', flexDirection: matches ? 'column' : 'row' }}>
        <div className='info'>
          <h1 className='tittle'>GEO TRACKER</h1>
          <img src="/earth.svg" className='im-logo' alt="Logo" />
        </div>
        <div>
          <p className='description'>¡Encontrar una ruta nunca fue tan fácil! Selecciona el mapa la ciudad, origen y destino e iniciemos la magia</p>
        </div>
      </Container>
      <Container>
        <FormGroup sx={{ alignItems: 'center', flexDirection: 'row', marginLeft: 10, color: 'white' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCheckbox === 'medellin'}
                onChange={handleCheckboxChange}
                name="medellin"
                sx={{ 
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                  color: 'white',
                  '&.Mui-checked': { color: 'white' }
                }}
              />
            }
            label="Medellín"
            sx={{ 
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Russo One',
                fontSize: '28px',
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
                  '& .MuiSvgIcon-root': { fontSize: 32 },
                  color: 'white',
                  '&.Mui-checked': { color: 'white' }
                }}
              />
            }
            label="Envigado"
            sx={{ 
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Russo One',
                fontSize: '28px',
              }
            }}
          />
        </FormGroup>
      </Container>
    </>
  );
}

export default App;