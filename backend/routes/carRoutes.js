const express = require('express');
const { Pool } = require('pg');
const i18n = require('../config/i18');


const router = express.Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

router.use(express.json());

router.post('/', async (req, res) => {
    try {
        const { car_brand, car_name, car_year, car_engine, car_fuel, car_img } = req.body;
        const result = await pool.query(
            'INSERT INTO car (car_brand, car_name, car_year, car_engine, car_fuel, car_img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [car_brand, car_name, car_year, car_engine, car_fuel, car_img]
        );
        res.status(200).json({
            status: 'success',
            result: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating car:', error.message);
        res.status(500).json({ status: 'error', error: i18n.__('Internal Server Error') });
    }
});

// Get all cars
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM car');
        res.status(200).json({ status: 'succes', result: result.rows });
    } catch (error) {
        console.error('Error retrieving cars:', error.message);
        res.status(500).json({ status: 'error', error: i18n.__('Internal Server Error') });
    }
});

//Get car by name
// Do zrobienia
router.get('/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const result = await pool.query('SELECT * FROM car WHERE car_id = $1', [id]);
        res.status(200).json({ status: 'succes', resault: result.rows[0] });
    } catch (error) {
        console.error('Error retrieving car:', error.message);
        res.status(500).json({ status: 'error', error: i18n__('Internal Server Error') });
    }
});


// Update a car by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { car_brand, car_name, car_year, car_engine, car_fuel, car_img } = req.body;
        const result = await pool.query(
            'UPDATE car SET car_brand = $1, car_name = $2, car_year = $3, car_engine = $4, car_fuel = $5, car_img = $6 WHERE car_id = $7 RETURNING *',
            [car_brand, car_name, car_year, car_engine, car_fuel, car_img, id]
        );
        res.status(200).json({ status: 'succes', result: result.rows[0] });
    } catch (error) {
        console.error('Error updating car:', error.message);
        res.status(500).json({ status: 'error', error: i18n__('Internal Server Error') });
    }
});

// Delete a car by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM car WHERE car_id = $1 RETURNING *', [id]);
        res.status(200).json({ status: 'succes', result: result.rows[0] });
    } catch (error) {
        console.error('Error deleting car:', error.message);
        res.status(500).json({ status: 'error', error: i18n__('Internal Server Error') });
    }
});



module.exports = router;