const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newItem = new Item({ name });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Update an item (mark as purchased/unpurchased)
router.patch('/:id', async (req, res) => {
  try {
    const { purchased } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { purchased },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

module.exports = router; 