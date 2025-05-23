// models/Gallery.js
import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String, // "image" or "video"
      enum: ['image', 'video'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    eventDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
// This code defines a Mongoose schema and model for a Gallery entity in a Node.js application. The GallerySchema includes fields for the gallery item's title, media type (either "image" or "video"), URL, description, and event date. The title and mediaType fields are required, while the description field is optional. The timestamps option automatically adds createdAt and updatedAt fields to the schema. Finally, the schema is compiled into a model named 'Gallery', which can be used to interact with the gallery collection in a MongoDB database.
// The model can be used to create, read, update, and delete gallery records in the database. This is a common pattern in Node.js applications that use MongoDB for data storage. The mediaType field allows for different types of media to be represented, enabling the application to manage various gallery items effectively.