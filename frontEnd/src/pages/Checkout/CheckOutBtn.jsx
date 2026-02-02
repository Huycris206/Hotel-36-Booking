import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; // 👇 Import hook điều hướng

const CheckOutBtn = ({ userId, roomId, checkIn, checkOut, totalAmount }) => {
  const navigate = useNavigate(); // 👇 Khởi tạo hook

  const handleCheckout = async () => {
    try {
      // 1. Tạo booking
      const bookingRes = await axios.post("http://localhost:5001/api/bookings", {
        user: userId,
        room: roomId,
        check_in: checkIn,
        check_out: checkOut,
        total_amount: totalAmount
      });

      const bookingId = bookingRes.data._id;

      // 2. Tạo payment
      await axios.post("http://localhost:5001/api/payments", {
        booking: bookingId,
        amount: totalAmount,
        payment_method: "momo",
        transaction_id: `MOMO${Date.now()}` // Fake mã giao dịch để nhìn cho uy tín
      });

      // 3. Thông báo và chuyển hướng
      alert("🎉 Thanh toán thành công! Cảm ơn bạn đã đặt phòng.");
      navigate("/my-booking"); // 👇 Chuyển về trang Lịch sử đặt phòng

    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra trong quá trình thanh toán: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div 
        onClick={handleCheckout}
        className='bg-orange-500 cursor-pointer focus:bg-orange-600 hover:bg-orange-600 rounded-2xl border p-6 space-y-4 w-full text-white font-bold text-center shadow-md transition-all active:scale-95'
    >
      Thanh toán ngay
    </div>
  )
}

export default CheckOutBtn;