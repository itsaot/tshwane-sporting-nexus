
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Player from './models/Player.js';
import Coach from './models/Coach.js';
import Gallery from './models/Gallery.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const initializeData = async () => {
  try {
    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@tsfc.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await User.create({
        name: 'Admin User',
        email: 'admin@tsfc.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Admin user created');
    }

    // Add sample players if none exist
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
      console.log('✅ Sample players added');
    }

    // Add sample coaches if none exist
    const coachCount = await Coach.countDocuments();
    if (coachCount === 0) {
      await Coach.insertMany([
        {
          name: 'Michael Johnson',
          position: 'Head Coach',
          experience: 15,
          nationality: 'South Africa',
          bio: 'Experienced coach with a passion for developing young talent.',
          imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          qualifications: ['CAF A License', 'UEFA B License']
        }
      ]);
      console.log('✅ Sample coaches added');
    }

    console.log('🎉 Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing data:', error);
    process.exit(1);
  }
};

// Connect to database and initialize data
connectDB().then(initializeData);
