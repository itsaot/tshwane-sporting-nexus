const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'viewer'],
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
// This code defines a Mongoose schema and model for a User entity in a Node.js application. The UserSchema includes fields for the user's username, password, role, and the date the user was created. The username field is required and must be unique, while the password field is also required. The role field can be either 'admin' or 'viewer', with 'admin' as the default value. The createdAt field defaults to the current date and time when a new user is created. Finally, the schema is compiled into a model named 'User', which can be used to interact with the users collection in a MongoDB database.
// The model can be used to create, read, update, and delete user records in the database. This is a common pattern in Node.js applications that use MongoDB for data storage. The role field allows for different levels of access control within the application, enabling the implementation of role-based access control (RBAC) features.