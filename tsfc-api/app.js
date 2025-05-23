// app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import usersRouter from './routes/users.js';
import playersRouter from './routes/players.js';
import coachesRouter from './routes/coaches.js';
import galleryRouter from './routes/gallery.js';


dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', usersRouter);
app.use('/api/players', playersRouter);
app.use('/api/coaches', coachesRouter);
app.use('/api/gallery', galleryRouter);

export default app;
// app.js
// This code sets up an Express.js application that connects to a MongoDB database using Mongoose. It imports necessary modules, including dotenv for environment variable management, cors for handling cross-origin requests, and path for file path manipulation. The application uses middleware to parse JSON requests and serve static files from the 'uploads' directory.