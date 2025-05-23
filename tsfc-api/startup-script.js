
// Script to create initial admin user and sample data
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Player from './models/Player.js';
import Coach from './models/Coach.js';
import Gallery from './models/Gallery.js';

dotenv.config();

const createInitialData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@tsfc.co.za' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin User',
        email: 'admin@tsfc.co.za',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created');
    }

    // Create sample players if collection is empty
    const playerCount = await Player.countDocuments();
    if (playerCount === 0) {
      await Player.insertMany([
        {
          name: 'John Smith',
          position: 'Goalkeeper',
          jerseyNumber: 1,
          age: 28,
          height: '6\'2"',
          weight: '90kg',
          nationality: 'South Africa',
          bio: 'Team captain with exceptional leadership skills.',
          imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
          name: 'David Mabaso',
          position: 'Defender',
          jerseyNumber: 4,
          age: 25,
          height: '6\'0"',
          weight: '85kg',
          nationality: 'South Africa',
          bio: 'Strong defensive skills and excellent at set pieces.',
          imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
      ]);
      console.log('Sample players created');
    }

    // Create sample coaches if collection is empty
    const coachCount = await Coach.countDocuments();
    if (coachCount === 0) {
      await Coach.insertMany([
        {
          name: 'James Peterson',
          position: 'Head Coach',
          experience: 15,
          nationality: 'South Africa',
          bio: 'Former professional player with extensive coaching experience.',
          imageUrl: 'https://images.unsplash.com/photo-1553867745-6e038d085e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          qualifications: ['UEFA Pro License', 'Sports Science Degree']
        }
      ]);
      console.log('Sample coaches created');
    }

    console.log('Initial data setup complete');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up initial data:', error);
    process.exit(1);
  }
};

createInitialData();
