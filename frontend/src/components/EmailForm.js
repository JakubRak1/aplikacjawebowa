import React, { useState } from 'react';
import '../static/styles/emailStyle.css';
import api from "../api/apiConfig";
import Modal from '../modal/ModalSucces';


const EmailForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [messageIsSuccess, setMessageIsSuccess] = useState(true);

    const openModal = (message) => {
        setModalIsOpen(true);
        setMessageIsSuccess(message);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setFormData({
            name: '',
            email: '',
            message: '',
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post('/send_email', formData)
        if (response.status === 200) {
            console.log('Sended')
            openModal(true);
        } else {
            console.log('Fail');
            openModal(false);
        }
        console.log('Form submitted:', formData);
    };

    return (
        <div className="email-form-container">
            <div>
                <Modal isOpen={modalIsOpen} onClose={closeModal} isSuccess={messageIsSuccess} />
            </div>
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
