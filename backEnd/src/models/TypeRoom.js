import mongoose from 'mongoose';

const typeRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amenities: {
    type: Object // hoặc [String] nếu muốn
  },
  price_hourly: {
    type: mongoose.Schema.Types.Decimal128,
    default:70000,
    required: true
  },
  price_additional_hour: {
    type: mongoose.Schema.Types.Decimal128,
    default:20000
  },
  price_daily: {
    type: mongoose.Schema.Types.Decimal128,
    default:300000
  },
  price_overnight: {
    type: mongoose.Schema.Types.Decimal128,
    default:170000
  },
  image_url: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('TypeRoom', typeRoomSchema);
