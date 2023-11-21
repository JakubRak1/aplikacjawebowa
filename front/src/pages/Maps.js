import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const Map = ({ apiKey }) => {
    const [address, setAddress] = useState('');
    const [center, setCenter] = useState({ lat: 51.128240, lng: 16.982527 });
    const [markers, setMarkers] = useState([]);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleSearch = async (searchAddress) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchAddress)}&key=${apiKey}`
            );
            const { lat, lng } = response.data.results[0].geometry.location;
            setCenter({ lat, lng });
            setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClearMarkers = () => {
        setMarkers([]);
    };

    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='flex-row'>
                <input type="text" value={address} onChange={handleAddressChange} placeholder="Enter an address" />
                <button onClick={() => handleSearch(address)}>Search</button>
            </div>
            <button onClick={handleClearMarkers}>Clear Markers</button>


            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={{ height: '400px', width: '800px' }}
                    center={center}
                    zoom={15}
                >
                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker} />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
