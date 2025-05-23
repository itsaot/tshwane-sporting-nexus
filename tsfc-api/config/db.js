// config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
// config/db.js
// This code connects to a MongoDB database using Mongoose. It exports a function that attempts to connect to the database using the URI stored in the environment variable MONGO_URI. If the connection is successful, it logs "MongoDB connected" to the console. If there is an error, it logs the error message and exits the process with a failure code.
// The code uses async/await syntax for better readability and error handling. The connection options include useNewUrlParser and useUnifiedTopology to avoid deprecation warnings. The connectDB function is then exported for use in other parts of the application, such as in the main app file where the server is set up. 