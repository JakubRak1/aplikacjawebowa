import React, { useState, useEffect } from 'react';
import api from "../api/apiConfig";

const LogoImage = () => {
    const [image, setImage] = useState(null);
    const logoName = 'logo.png';

    useEffect(() => {
        const imageUrl = `/getImage/${logoName}`;
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
    }, [logoName]);

    return (
        <div>
            {image && <img src={image} className='App-logo' alt="logo" />}
        </div>
    );
};

export default LogoImage;
