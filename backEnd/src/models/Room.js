import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeRoom',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'cleaning', 'maintenance'],
    default: 'available'
  }
}, { timestamps: true });

export default mongoose.model('Room', roomSchema);
