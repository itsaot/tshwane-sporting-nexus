// models/Player.js
import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    jerseyNumber: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Player = mongoose.model('Player', playerSchema);

export default Player;

// This code defines a Mongoose schema and model for a Player entity in a Node.js application. The PlayerSchema includes fields for the player's name, position, number, biography, image, and the date the player was created. The name field is required, while the others are optional. The createdAt field defaults to the current date and time when a new player is created. Finally, the schema is compiled into a model named 'Player', which can be used to interact with the players collection in a MongoDB database.
// The model can be used to create, read, update, and delete player records in the database. This is a common pattern in Node.js applications that use MongoDB for data storage.