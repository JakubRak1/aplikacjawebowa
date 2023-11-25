const express = require('express');
const { Pool } = require('pg');
const i18n = require('../config/i18');

const router = express.Router();
const pool = new Pool({
    user: 'kuba',
    host: 'postgres',
    database: 'db',
    password: 'rotmistrz',
    port: 5432
});

router.use(express.json());

// Get all cars
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM car');
        res.status(200).json({ status: 'succes', data: result.rows });
    } catch (error) {
        console.error('Error retrieving cars:', error.message);
        res.status(500).json({ status: 'error', error: i18n.__('Internal Server Error') });
    }
});

module.exports = router;