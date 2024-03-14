import React, { useState } from 'react';
import axios from 'axios';


const EsimentAverage = () => {

    const [estimatAverage, setEstimatAverage] = useState();
    const handleMonthClick = async () => {

        axios.get('http://localhost:8080/Estimat')
            .then(response => {
                setEstimatAverage(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (

        <div>
            <div>
                <button onClick={handleMonthClick}>   see the Estimat dollar value  to next month  </button>
                {<p>{estimatAverage}</p>}
            </div>
        </div>
    );
};

export default EsimentAverage;