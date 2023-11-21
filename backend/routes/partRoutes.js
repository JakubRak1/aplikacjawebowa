const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

router.use(express.json());

// Create a new part
router.post('/', async (req, res) => {
    try {
        const { category_id, part_name, part_desc, part_img } = req.body;
        const result = await pool.query(
            'INSERT INTO part (category_id, part_name, part_desc, part_img) VALUES ($1, $2, $3, $4) RETURNING *',
            [category_id, part_name, part_desc, part_img]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error creating part:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all parts
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM part');
        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving parts:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific part by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM part WHERE part_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error retrieving part:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a part by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { category_id, part_name, part_desc, part_img } = req.body;
        const result = await pool.query(
            'UPDATE part SET category_id = $1, part_name = $2, part_desc = $3, part_img = $4 WHERE part_id = $5 RETURNING *',
            [category_id, part_name, part_desc, part_img, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating part:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a part by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM part WHERE part_id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting part:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
