import React, { useState, useEffect } from 'react';
import api from "../api/apiConfig";

const LoadImg = ({ img }) => {
    const [image, setImage] = useState(null);
    const LoadImg = `${img}`;

    useEffect(() => {
        const imageUrl = `/getImage/${LoadImg}`;
        api.get(imageUrl, { responseType: 'blob' })
            .then(response => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result);
                };
                reader.readAsDataURL(response.data);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    }, [LoadImg]);

    return (
        <div>
            {image && <img src={image} className='App-logo' alt={image} />}
        </div>
    );
};

export default LoadImg;
