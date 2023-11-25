import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../static/styles/modalDelete.css';

const ModalDelete = ({ show, handleClose, handleDelete }) => {
    return (
        <Modal show={show} onHide={handleClose} className="custom-modal-delete">
            <span className="close" onClick={handleClose}>&times;</span>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDelete;

