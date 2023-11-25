const express = require('express');
const { Pool } = require('pg');
const i18n = require('../config/i18');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const router = express.Router();
const pool = new Pool({
    user: 'kuba',
    host: 'postgres',
    database: 'db',
    password: 'rotmistrz',
    port: 5432
});

router.use(express.json());
router.use(cors());

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../files/'),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, ext);
        cb(null, `${fileName}_${Date.now()}${ext}`);
    },
});


const upload = multer({ storage: storage });

// Create a new part
router.post('/', upload.single('part_img'), async (req, res) => {
    try {
        const part_img_name = req.file.filename
        const { part_name, part_desc, car_id } = req.body;
        const part_img = req.file;

        const result = await pool.query(
            'INSERT INTO part (car_id, part_name, part_desc, part_img) VALUES ($1, $2, $3, $4) RETURNING *',
            [car_id, part_name, part_desc, part_img_name]
        );
        res.status(200).json({
            status: 'success',
            result: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating part:', error.message);
        res.status(500).json({ status: 'error', error: i18n.__('Internal Server Error') });
    }
});

// Get all parts
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM part');
        res.status(200).json({ status: 'succes', data: result.rows });
    } catch (error) {
        console.error('Error retrieving parts:', error.message);
        res.status(500).json({ status: 'error', error: i18n.__('Internal Server Error') });
    }
});

// Get a specific part by car_ID
router.get('/search_car:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM part WHERE car_id = $1', [id]);
        res.status(200).json({ status: 'succes', data: result.rows });
    } catch (error) {
        console.error('Error retrieving part:', error.message);
        res.status(500).json({ status: 'error', error: i18n.__('Internal Server Error') });
    }
});

// Get a specific part by ID
router.get('/search:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM part WHERE part_id = $1', [id]);
        res.status(200).json({ status: 'succes', data: result.rows[0] });
    } catch (error) {
        console.error('Error retrieving part:', error.message);
        res.status(500).json({ status: 'error', error: i18n.__('Internal Server Error') });
    }
});

// Update a part by ID
router.patch('/update:id', upload.single('part_img'), async (req, res) => {
    try {
        const { id } = req.params;
        const part_img_name = req.file.filename
        const { part_name, part_desc } = req.body;
        const part_img = req.file;

        const result = await pool.query(
            'UPDATE part SET part_name = $1, part_desc = $2, part_img = $3 WHERE part_id = $4 RETURNING *',
            [part_name, part_desc, part_img_name, id]
        );
        res.status(200).json({ status: 'succes', data: result.rows[0] });
    } catch (error) {
        console.error('Error updating part:', error.message);
        res.status(500).json({ status: 'error', error: i18n.__('Internal Server Error') });
    }
});

// Delete a part by ID
router.delete('/delete:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM part WHERE part_id = $1 RETURNING *', [id]);
        res.status(200).json({ status: 'succes', data: result.rows[0] });
    } catch (error) {
        console.error('Error deleting part:', error.message);
        res.status(500).json({ status: 'error', error: i18n.__('Internal Server Error') });
    }
});

module.exports = router;
