import React from 'react';
import '../static/styles/modal.css';

const Modal = ({ isOpen, onClose, isSuccess }) => {
    const modalClass = `modal ${isOpen ? 'open' : ''}`;
    const message = isSuccess ? 'Success' : 'Failed';

    return (
        <div className={modalClass}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Modal;
