import Verification from '../models/Verfication.js';

// [POST] Gửi mã xác thực (OTP)
export const sendVerification = async (req, res) => {
    try {
        const { phone, type } = req.body;

        // 1. Tạo mã OTP ngẫu nhiên 6 chữ số
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // 2. Thiết lập thời gian hết hạn (ví dụ: 5 phút kể từ bây giờ)
        const expiryDate = new Date(Date.now() + 5 * 60 * 1000);

        // 3. Lưu vào database
        const newVerification = new Verification({
            phone,
            code: otpCode, // Trong thực tế nên hash mã này nếu cần bảo mật cực cao
            type,
            expired_at: expiryDate
        });

        await newVerification.save();

        // 4. Giả lập gửi SMS (Trong thực tế bạn sẽ gọi API của Twilio, eSMS, v.v. ở đây)
        console.log(`[SMS] Gửi mã ${otpCode} đến số ${phone}`);

        res.status(200).json({ 
            message: "Mã xác thực đã được gửi!",
            // Lưu ý: Không trả code về client ở đây, code chỉ gửi qua SMS
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi gửi mã", error: err.message });
    }
};

// [POST] Kiểm tra mã OTP người dùng nhập
export const verifyCode = async (req, res) => {
    try {
        const { phone, code, type } = req.body;

        // 1. Tìm bản ghi mới nhất, chưa xác thực và khớp với loại (type)
        const record = await Verification.findOne({
            phone,
            code,
            type,
            is_verified: false
        }).sort({ createdAt: -1 });

        // 2. Kiểm tra nếu không tìm thấy
        if (!record) {
            return res.status(400).json({ message: "Mã xác thực không chính xác!" });
        }

        // 3. Kiểm tra hết hạn
        if (new Date() > record.expired_at) {
            return res.status(400).json({ message: "Mã xác thực đã hết hạn!" });
        }

        // 4. Đánh dấu đã xác thực thành công
        record.is_verified = true;
        await record.save();

        res.status(200).json({ 
            message: "Xác thực thành công!",
            is_verified: true 
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xác thực", error: err.message });
    }
};