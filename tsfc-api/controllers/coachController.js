const Coach = require('../models/Coach');

exports.getCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCoach = async (req, res) => {
  const { name, role, experience } = req.body;
  const image = req.file?.filename || null;

  try {
    const newCoach = new Coach({ name, role, experience, image });
    await newCoach.save();
    res.status(201).json(newCoach);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCoach = async (req, res) => {
  try {
    const updated = await Coach.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: req.file?.filename },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCoach = async (req, res) => {
  try {
    await Coach.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coach deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// This code defines a set of controller functions for managing coach data in a Node.js application using Express and Mongoose. The functions include getting all coaches, creating a new coach, updating an existing coach, and deleting a coach. Each function handles errors appropriately and sends JSON responses to the client. The createCoach function also handles file uploads for coach images using multer middleware. The code is structured to follow RESTful API conventions, making it easy to integrate with front-end applications or other services.
// The controller functions are typically used in conjunction with routes defined in an Express application. For example, you would set up routes for each of these functions in a separate file and use them to handle incoming HTTP requests. This separation of concerns helps keep the code organized and maintainable.