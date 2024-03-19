import React, { useEffect ,useReducer} from 'react';
import axios from 'axios';
import './../App.css'
import PredictionTable from './PredictTable'

const URL = process.env.REACT_APP_URL;

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_DOLLARPREDICT':
                return {
                    ...state,
                    dollarpredict: action.payload
                };
            default:
                return state;
        }
    };
    const PredictionMatrix = () => {

         const initialState = {
            dollarpredict: []
        };
    
        const [state, dispatch] = useReducer(reducer, initialState);
        useEffect(() => {
            const url = `${URL}/EstimatAllData`
            axios.get(url)
              .then(response => {
                dispatch({ type: 'SET_DOLLARPREDICT', payload: response.data },6000);
              })
              .catch(error => {
               throw new Error("Error: " + error)
              });
        }, []);
 return (

    <PredictionTable dollarpredict={state.dollarpredict}/>
 )    
      
    };

export default PredictionMatrix;
