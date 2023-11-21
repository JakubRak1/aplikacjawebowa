const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

router.use(express.json());

// Create a new category
router.post('/', async (req, res) => {
    try {
        const { car_id, category_name } = req.body;
        const result = await pool.query(
            'INSERT INTO category (car_id, category_name) VALUES ($1, $2) RETURNING *',
            [car_id, category_name]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error creating category:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM category');
        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving categories:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific category by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM category WHERE category_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error retrieving category:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { car_id, category_name } = req.body;
        const result = await pool.query(
            'UPDATE category SET car_id = $1, category_name = $2 WHERE category_id = $3 RETURNING *',
            [car_id, category_name, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating category:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM category WHERE category_id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting category:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;