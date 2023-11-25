import React, { useState, useEffect } from 'react';
import api from '../api/apiConfig';
import LoadImg from './LoadImg';
import '../static/styles/carDisplay.css'
import CarParts from './CarParts';


const CarsDisplay = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/car')
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const renderRows = () => {
        return data.map(item => (
            <div className='car'>
                <div key={item.car_id} className="carRow">
                    <h1>{item.car_name}</h1>
                    <LoadImg img={item.car_img.toString()} />
                    <p>Marka: {item.car_brand}</p>
                    <p>Rok produkcji: {item.car_year}</p>
                    <p>Silnik: {item.car_engine}</p>
                    <p>Paliwo: {item.car_fuel}</p>
                </div>
                <CarParts car_id={item.car_id} />
            </div>
        ));
    };


    return (
        <div className="carContainer">
            {renderRows()}
        </div>
    );
};

export default CarsDisplay;