import React, {useEffect, useState} from 'react';
import Error from '../components/Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import styled from '@emotion/styled';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFFFFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;

const Formulario = ({setMoneda, setCrypto}) => {

    //state del listado de la criptomonedas

    const [listacripto, setCripto] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar USA'},
        {codigo: 'ARS', nombre: 'Pesito Argentino'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
    ]

    //utilizamos useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda:', '', MONEDAS);

    const [criptomoneda, SelectCripto] = useCriptomoneda('Elije tu Criptomoneda', '', listacripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=ARS';
            const resultados = await axios.get(URL);

            setCripto(resultados.data.Data);

        };
        consultarAPI();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();
        if(moneda ==='' || criptomoneda ===''){
            setError(true);
            return null;
        };
        setError(false);
        setMoneda(moneda);
        setCrypto(criptomoneda);
    };

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
        {error ? <Error mensaje= 'Todos los campos son obligatorios' /> : null}    

            <SelectMoneda />
            <SelectCripto />

            <Boton
                type= 'submit'
                value= 'Cotizar'
            />
        </form>
     );
}
 
export default Formulario;