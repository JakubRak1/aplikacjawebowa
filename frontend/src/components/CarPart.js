import React, { useState, useEffect } from 'react';
import api from '../api/apiConfig';
import LoadImg from './LoadImg';
import '../static/styles/carDisplay.css'
import ModalDelete from '../modal/ModalDelete';
import ModalModify from '../modal/ModalModify';

const CarPart = ({ searchTerm }) => {
    const [data, setData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [initialValues, setInitialValues] = useState({
        part_name: '',
        part_desc: '',
        part_img: null,
    });

    useEffect(() => {
        api.get(`/part/search_part_name?name=${searchTerm}`)
            .then(response => {
                setData(response.data.data);
                // TEST!!!!
                console.log(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [searchTerm]);

    const handleDelete = () => {
        api.delete(`/part/delete${selectedItemId}`)
            .then(() => {
                setShowDeleteModal(false);
                setSelectedItemId(null);
                fetchData();
            })
            .catch(error => {
                console.error('Error deleting part:', error);
            });
    };

    const handleShowDeleteModal = (itemId) => {
        setShowDeleteModal(true);
        setSelectedItemId(itemId);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedItemId(null);
    };

    const handleAddModifySubmit = (values) => {
        const formData = new FormData();
        formData.append('part_name', values.part_name);
        formData.append('part_desc', values.part_desc);
        if (values.part_img) {
            formData.append('part_img', values.part_img, values.part_img.name);
        }

        // Check if it's a new part or modification of an existing part
        if (selectedItemId) {
            // Modify existing part
            api.patch(`/part/update${selectedItemId}`, formData)
                .then(() => {
                    handleCloseModifyModal();
                    fetchData();
                })
                .catch(error => {
                    console.error('Error modifying part:', error);
                });
        } else {
            // Add new part
            api.post('/part', formData)
                .then(() => {
                    handleCloseModifyModal();
                    fetchData();
                })
                .catch(error => {
                    console.error('Error adding new part:', error);
                });
        }
        setShowModifyModal(false);
        setSelectedItemId(null);
        fetchData();
    };


    const fetchData = () => {
        api.get(`/part/search_part_name?name=${searchTerm}`)
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };


    const handleShowModifyModal = (itemId) => {
        const selectedItem = data.find(item => item.part_id === itemId);
        setInitialValues({
            part_name: selectedItem.part_name,
            part_desc: selectedItem.part_desc,
            part_img: null,
        });
        setShowModifyModal(true);
        setSelectedItemId(itemId);
    };


    const handleCloseModifyModal = () => {
        setShowModifyModal(false);
        setSelectedItemId(null);
        setInitialValues({
            part_name: '',
            part_desc: '',
            part_img: null,
        });
    };

    const renderRows = () => {
        return data.map(item => (
            <div key={item.part_id} className="carRow">
                <h1>{item.part_name}</h1>
                <LoadImg img={item.part_img === 1 ? 'placeholder.png' : item.part_img.toString()} />
                <p>Opis: {item.part_desc}</p>
                <button onClick={() => handleShowModifyModal(item.part_id)}>
                    Modify Part
                </button>
                <button onClick={() => handleShowDeleteModal(item.part_id)}>
                    Delete
                </button>
            </div >
        ));
    };


    return (
        <div>
            <div className="partContainer">
                {renderRows()}
                <ModalDelete
                    show={showDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    handleDelete={handleDelete}
                />
                <ModalModify
                    show={showModifyModal}
                    handleClose={handleCloseModifyModal}
                    handleAddModifySubmit={handleAddModifySubmit}
                    initialValues={initialValues}
                />
            </div>
        </div>
    );
};

export default CarPart;