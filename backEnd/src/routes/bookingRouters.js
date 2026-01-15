import express from 'express';
import { 
    createBooking, 
    getAllBookings, 
    getBookingById, 
    updateBooking, 
    deleteBooking 
} from '../controllers/bookingController.js';

const router = express.Router();

// Cấu trúc: /api/bookings
router.post("/", createBooking);          // Tạo đơn mới
router.get("/", getAllBookings);         // Lấy tất cả
router.get("/:id", getBookingById);      // Lấy 1 đơn
router.put("/:id", updateBooking);       // Cập nhật
router.delete("/:id", deleteBooking);    // Xóa

export default router;