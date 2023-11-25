import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalModify = ({ show, handleClose, handleAddModifySubmit, initialValues }) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setValues((prevValues) => ({
            ...prevValues,
            part_img: file,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddModifySubmit(values);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Title>Add/Modify Item</Modal.Title>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formPartName">
                        <Form.Label>Part Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="part_name"
                            value={values.part_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPartDesc">
                        <Form.Label>Part Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="part_desc"
                            value={values.part_desc}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPartImg">
                        <Form.Label>Part Image</Form.Label>
                        <Form.Control type="file" name="part_img" onChange={handleFileChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalModify;