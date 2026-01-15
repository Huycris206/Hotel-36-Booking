import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  payment_method: {
    type: String,
    enum: ['bank', 'momo'],
    required: true
  },
  transaction_id: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'refunded'],
    default: 'pending'
  },
  paid_at: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
