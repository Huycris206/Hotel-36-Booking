import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['booking', 'register', 'forgot_password'],
    required: true
  },
  expired_at: {
    type: Date,
    required: true
  },
  is_verified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Verification', verificationSchema);
