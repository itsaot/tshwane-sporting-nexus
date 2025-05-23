const Player = require('../models/Player');

exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPlayer = async (req, res) => {
  const { name, position, number, bio } = req.body;
  const image = req.file?.filename || null;

  try {
    const newPlayer = new Player({ name, position, number, bio, image });
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const updated = await Player.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: req.file?.filename },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: 'Player deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// This code defines a set of controller functions for managing player data in a Node.js application using Express and Mongoose. The functions include getting all players, getting a single player by ID, creating a new player, updating an existing player, and deleting a player. Each function handles errors appropriately and sends JSON responses to the client. The createPlayer function also handles file uploads for player images using multer middleware. The code is structured to follow RESTful API conventions, making it easy to integrate with front-end applications or other services.
// The controller functions are typically used in conjunction with routes defined in an Express application. For example, you would set up routes for each of these functions in a separate file and use them to handle incoming HTTP requests. This separation of concerns helps keep the code organized and maintainable.