// routes/coaches.js
import express from 'express';
import Coach from '../models/Coach.js';

const router = express.Router();

// Create a new coach (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, role, imageUrl } = req.body;
    const newCoach = new Coach({ name, role, imageUrl });
    const savedCoach = await newCoach.save();
    res.status(201).json(savedCoach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all coaches (User)
router.get('/', async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single coach
router.get('/:id', async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) return res.status(404).json({ message: 'Coach not found' });
    res.json(coach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update coach
router.put('/:id', async (req, res) => {
  try {
    const updatedCoach = await Coach.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCoach) return res.status(404).json({ message: 'Coach not found' });
    res.json(updatedCoach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete coach
router.delete('/:id', async (req, res) => {
  try {
    const deletedCoach = await Coach.findByIdAndDelete(req.params.id);
    if (!deletedCoach) return res.status(404).json({ message: 'Coach not found' });
    res.json({ message: 'Coach deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
