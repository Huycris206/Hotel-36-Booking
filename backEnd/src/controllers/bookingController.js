import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Room from '../models/Room.js';

// [POST] Tạo đơn đặt phòng mới
export const createBooking = async (req, res) => {
    try {
        const { user, room, check_in, check_out, total_amount } = req.body;

        // 1. Kiểm tra User và Room có tồn tại không
        const [existingUser, existingRoom] = await Promise.all([
            User.findById(user),
            Room.findById(room)
        ]);

        if (!existingUser) return res.status(404).json({ message: "Người dùng không tồn tại!" });
        if (!existingRoom) return res.status(404).json({ message: "Phòng không tồn tại!" });

        // 2. Kiểm tra logic ngày tháng
        if (new Date(check_in) >= new Date(check_out)) {
            return res.status(400).json({ message: "Ngày trả phòng phải sau ngày nhận phòng!" });
        }

        // 3. Lưu vào Database
        const newBooking = new Booking({
            user,
            room,
            check_in,
            check_out,
            total_amount
        });

        const savedBooking = await newBooking.save();
        
        // Trả về dữ liệu kèm thông tin chi tiết của User và Room
        const result = await savedBooking.populate(['user', 'room']);
        res.status(201).json(result);

    } catch (err) {
        res.status(500).json({ message: "Lỗi khi tạo đặt phòng", error: err.message });
    }
};

// [GET] Lấy toàn bộ danh sách đặt phòng
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name phoneNumber') // Chỉ lấy name và phone của user cho nhẹ
            .populate('room')
            .sort({ created_at: -1 }); // Đơn mới nhất lên đầu
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Lỗi lấy dữ liệu", error: err.message });
    }
};

// [GET] Lấy chi tiết 1 đơn đặt phòng
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate(['user', 'room']);
        if (!booking) return res.status(404).json({ message: "Không tìm thấy đơn đặt phòng" });
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: "Lỗi lấy chi tiết", error: err.message });
    }
};

// [PUT] Cập nhật thông tin đơn đặt phòng
export const updateBooking = async (req, res) => {
    try {
        const { check_in, check_out } = req.body;

        // Kiểm tra logic ngày nếu có cập nhật ngày
        if (check_in && check_out && new Date(check_in) >= new Date(check_out)) {
            return res.status(400).json({ message: "Ngày trả phòng không hợp lệ!" });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        ).populate(['user', 'room']);

        if (!updatedBooking) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        res.status(200).json(updatedBooking);
    } catch (err) {
        res.status(500).json({ message: "Lỗi cập nhật", error: err.message });
    }
};

// [DELETE] Xóa đơn đặt phòng
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Đơn hàng không tồn tại" });

        // Logic: Không cho xóa đơn đang sử dụng hoặc đã xong
        if (['using', 'completed'].includes(booking.status)) {
            return res.status(400).json({ message: "Không thể xóa đơn hàng đang sử dụng hoặc đã hoàn thành" });
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Xóa thành công" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xóa đơn hàng", error: err.message });
    }
};