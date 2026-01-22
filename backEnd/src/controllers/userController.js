import User from '../models/User.js';

// [POST] Tạo người dùng mới (Create)
export const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        
        // Loại bỏ mật khẩu trước khi trả về client
        const { password, ...others } = savedUser._doc;
        res.status(201).json(others);
    } catch (err) {
        res.status(500).json({ message: "Không thể tạo người dùng", error: err.message });
    }
};

// [GET] Lấy danh sách tất cả người dùng (Read All)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Lỗi lấy dữ liệu", error: err.message });
    }
};

// [GET] Lấy chi tiết 1 người dùng theo ID (Read One)
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json("Không tìm thấy người dùng");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// [PUT] Cập nhật thông tin (Update)
export const updateUser = async (req, res) => {
    try {
        // Lưu ý: Nếu cập nhật mật khẩu, middleware .pre('save') chỉ chạy khi dùng .save()
        // Ở đây mình ví dụ cập nhật thông tin thường:
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Trả về object sau khi đã update
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

// [DELETE] Xóa người dùng (Delete)
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Đã xóa người dùng thành công");
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Không lấy được thông tin người dùng" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, number_phone } = req.body;

    // 🔒 Chỉ cho phép sửa các field này
    if (!name || !email) {
      return res.status(400).json({
        message: "Tên và email không được để trống",
      });
    }

    // ❗ Check email trùng (nếu đổi)
    if (email !== req.user.email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({
          message: "Email đã được sử dụng",
        });
      }
    }

    // ❗ Check sđt trùng (nếu đổi)
    if (number_phone !== req.user.number_phone) {
      const phoneExist = await User.findOne({ number_phone });
      if (phoneExist) {
        return res.status(400).json({
          message: "Số điện thoại đã tồn tại",
        });
      }
    }

    req.user.name = name;
    req.user.email = email;
    req.user.number_phone = number_phone;

    const updatedUser = await req.user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({
      message: "Cập nhật thông tin thất bại",
    });
  }
};