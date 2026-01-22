import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================== REGISTER ==================
export const register = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, number_phone, password } = req.body;

    // 1️⃣ Validate
    if (!name || !number_phone || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin bắt buộc",
      });
    }

    // 2️⃣ Check sdt
    const existed = await User.findOne({ number_phone });
    if (existed) {
      return res.status(400).json({
        message: "số điện đã được sử dụng",
      });
    }

    // 3️⃣ Tạo user (❌ KHÔNG hash ở đây)
    const user = await User.create({
      name,
      email,
      number_phone,
      password, // 👈 để mongoose pre-save hash
    });

    // 4️⃣ Tạo token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Không trả password
    user.password = undefined;

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      message: "Lỗi đăng ký, vui lòng thử lại",
    });
  }
};

// ================== LOGIN ==================
export const login = async (req, res) => {
  try {
    const { number_phone, password } = req.body;

    // 1️⃣ Tìm user + lấy password
    const user = await User.findOne({ number_phone }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "số điện thoại hoặc mật khẩu sai" });
    }

    // 2️⃣ So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "số điện thoại hoặc mật khẩu sai" });
    }

    // 3️⃣ Tạo token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Trả user (không có password)
    user.password = undefined;

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};