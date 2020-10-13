import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import imagen from './cryptomonedas.png';
import styled from '@emotion/styled';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {
  const [moneda, setMoneda] = useState('');
  const [crypto, setCrypto] = useState('');
  const [resultado, setResultado] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    
    if(moneda === '') return;

    const cotizarAPI = async () => {
      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`
      const resultado = await axios.get(URL);

      setCargando(true);

      setTimeout(() =>{
        setCargando(false);
        setResultado(resultado.data.DISPLAY[crypto][moneda]);
      }, 3000)

    }
    cotizarAPI();
  }, [moneda, crypto])

  //mostrar Spinner
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt='imagen crypto'
        />
      </div>
      <div>
        <Heading>criptomonedas al instante</Heading>
        <Formulario 
        setCrypto={setCrypto}
        setMoneda={setMoneda}
        />
        {componente}
      </div>

    </Contenedor>
  );
}

export default App;
