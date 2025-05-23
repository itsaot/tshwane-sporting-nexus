// models/Coach.js
import mongoose from 'mongoose';

const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Coach = mongoose.model('Coach', coachSchema);

export default Coach;
// This code defines a Mongoose schema and model for a Coach entity in a Node.js application. The CoachSchema includes fields for the coach's name, role, and image URL. The name and role fields are required, while the imageUrl field is optional and defaults to an empty string. The timestamps option automatically adds createdAt and updatedAt fields to the schema. Finally, the schema is compiled into a model named 'Coach', which can be used to interact with the coaches collection in a MongoDB database.
// The model can be used to create, read, update, and delete coach records in the database. This is a common pattern in Node.js applications that use MongoDB for data storage. The role field allows for different types of coaches to be represented, enabling the application to manage various coaching staff effectively.