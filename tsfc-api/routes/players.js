// routes/players.js
import express from 'express';
import Player from '../models/Player.js';

const router = express.Router();

// Create a new player (Admin only)
router.post('/', async (req, res) => {
  try {
    const { name, position, jerseyNumber, imageUrl } = req.body;
    const newPlayer = new Player({ name, position, jerseyNumber, imageUrl });
    const savedPlayer = await newPlayer.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all players (User view)
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a player
router.put('/:id', async (req, res) => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPlayer) return res.status(404).json({ message: 'Player not found' });
    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a player
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
    if (!deletedPlayer) return res.status(404).json({ message: 'Player not found' });
    res.json({ message: 'Player deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
// This code defines a set of routes for managing player data in a Node.js application using Express and Mongoose. The routes include creating a new player, getting all players, getting a single player by ID, updating an existing player, and deleting a player. Each route handles errors appropriately and sends JSON responses to the client. The code is structured to follow RESTful API conventions, making it easy to integrate with front-end applications or other services.
// The routes are typically used in conjunction with a main application file where the Express app is created and configured. The routes would be mounted on a specific path, such as '/api/players', to handle incoming HTTP requests related to player data. This structure helps keep the code organized and maintainable, following best practices for building RESTful APIs in Node.js applications.