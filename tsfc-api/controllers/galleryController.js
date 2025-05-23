const Gallery = require('../models/Gallery');

exports.getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ eventDate: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMedia = async (req, res) => {
  const { title, description, mediaType, eventDate } = req.body;
  const fileUrl = req.file?.filename || null;

  try {
    const media = new Gallery({ title, description, mediaType, eventDate, fileUrl });
    await media.save();
    res.status(201).json(media);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Media deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateMedia = async (req, res) => {
  try {
    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fileUrl: req.file?.filename },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// This code defines a set of controller functions for managing media items in a gallery within a Node.js application using Express and Mongoose. The functions include getting all media items, adding new media, updating existing media, and deleting media items. Each function handles errors appropriately and sends JSON responses to the client. The addMedia function also handles file uploads for media files using multer middleware. The code is structured to follow RESTful API conventions, making it easy to integrate with front-end applications or other services.
// The controller functions are typically used in conjunction with routes defined in an Express application. For example, you would set up routes for each of these functions in a separate file and use them to handle incoming HTTP requests. This separation of concerns helps keep the code organized and maintainable.