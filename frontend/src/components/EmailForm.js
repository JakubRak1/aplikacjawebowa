import React, { useState } from 'react';
import '../static/styles/emailStyle.css';
import api from "../api/apiConfig";

const EmailForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post('/send_email', formData)
        if (response.status === 200) {
            console.log('Sended')
        } else {
            console.log('Fail')
        }
        console.log('Form submitted:', formData);
    };

    return (
        <div className="email-form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Message:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Send Email</button>
            </form>
        </div>
    );
};

export default EmailForm;
