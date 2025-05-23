
import mongoose from 'mongoose';

const coachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: Number,
    required: true
  },
  nationality: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  qualifications: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

export default mongoose.model('Coach', coachSchema);
