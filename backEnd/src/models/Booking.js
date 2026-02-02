import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  check_in: {
    type: Date,
    default: Date.now,
    required: true
  },
  check_out: {
    type: Date,
    default: null,
    required: true
  },
  total_amount: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'using', 'completed', 'overdue', 'cancelled', 'pending'],
    default: 'booked'
  }
}, { timestamps: { createdAt: 'created_at' } });

export default mongoose.model('Booking', bookingSchema);
