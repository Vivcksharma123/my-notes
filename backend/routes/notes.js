const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Notes.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new note
router.post('/', async (req, res) => {
    try {
        const note = new Notes(req.body);
        await note.save();
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a note
router.put('/:id', async (req, res) => {
    try {
        const note = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    try {
        await Notes.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;