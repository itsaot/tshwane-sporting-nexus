// routes/gallery.js
import express from 'express';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// Create a gallery item
router.post('/', async (req, res) => {
  try {
    const { title, mediaType, url, description, eventDate } = req.body;
    const newItem = new Gallery({ title, mediaType, url, description, eventDate });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single gallery item
router.get('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Media not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update gallery item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem) return res.status(404).json({ message: 'Media not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete gallery item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Media not found' });
    res.json({ message: 'Media deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
// This code defines a set of routes for managing a gallery of media items in a Node.js application using Express and Mongoose. The routes include creating, retrieving, updating, and deleting media items. Each route handles errors appropriately and sends JSON responses to the client. The code is structured to follow RESTful API conventions, making it easy to integrate with front-end applications or other services. The routes are typically used in conjunction with a controller that contains the business logic for each operation.
// The routes are defined using Express Router, which allows for modular route handling. Each route corresponds to a specific HTTP method (GET, POST, PUT, DELETE) and URL path. The code also includes error handling to ensure that appropriate responses are sent back to the client in case of any issues during database operations. Overall, this code provides a solid foundation for managing a gallery of media items in a web application.