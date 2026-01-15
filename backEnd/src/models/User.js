import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: function() {
      return this._id.toString(); // Chuyển ObjectId về String để lưu vào name
    }
  },
  role: {
    type: String,
    enum: ['admin', 'member', 'guest'],
    default: 'guest'
  },
  password: { 
    type: String, 
    minlength: 6,
    select: false // Khi query (find), mặc định sẽ không hiện mật khẩu để bảo mật
  },
  birth_date: {
    type: Date
  },
  number_phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String
  },
  point: {
    type: Number,
    default: 0
  }
}, { timestamps: true });
userSchema.pre('save', async function() {
    // 1. Nếu không có password (Guest) hoặc password không thay đổi thì thoát luôn
    if (!this.password || !this.isModified('password')) {
        return; // Trong async function, return thay cho next()
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // Không cần gọi next() ở đây nếu dùng async/await
    } catch (error) {
        throw error; // Ném lỗi để Controller bắt được
    }
});

export default mongoose.model('User', userSchema);
