import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';

// [POST] Tạo thanh toán mới
export const createPayment = async (req, res) => {
    try {
        const { booking, amount, payment_method, transaction_id } = req.body;

        // 1. Kiểm tra đơn đặt phòng có tồn tại không
        const existingBooking = await Booking.findById(booking);
        if (!existingBooking) {
            return res.status(404).json({ message: "Đơn đặt phòng không tồn tại!" });
        }

        // 2. Tạo bản ghi thanh toán
        const newPayment = new Payment({
            booking,
            amount,
            payment_method,
            transaction_id
        });

        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (err) {
        res.status(500).json({ message: "Lỗi tạo thanh toán", error: err.message });
    }
};

// [GET] Lấy danh sách thanh toán
export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate({
                path: 'booking',
                populate: { path: 'user', select: 'name phoneNumber' } // Lấy luôn thông tin khách hàng
            })
            .sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ message: "Lỗi lấy dữ liệu", error: err.message });
    }
};

// [PUT] Cập nhật trạng thái thanh toán (Xử lý Webhook hoặc Admin xác nhận)
export const updatePaymentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        const updatedPayment = await Payment.findByIdAndUpdate(
            id,
            { 
                $set: { 
                    status,
                    paid_at: status === 'success' ? new Date() : null 
                } 
            },
            { new: true, runValidators: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({ message: "Không tìm thấy giao dịch" });
        }

        // Logic bổ sung: Nếu thanh toán thành công, có thể cập nhật trạng thái Booking
        // if (status === 'success') {
        //    await Booking.findByIdAndUpdate(updatedPayment.booking, { status: 'booked' });
        // }

        res.status(200).json(updatedPayment);
    } catch (err) {
        res.status(500).json({ message: "Lỗi cập nhật thanh toán", error: err.message });
    }
};

// [DELETE] Xóa lịch sử thanh toán
export const deletePayment = async (req, res) => {
    try {
        await Payment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Đã xóa lịch sử giao dịch" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xóa giao dịch", error: err.message });
    }
};