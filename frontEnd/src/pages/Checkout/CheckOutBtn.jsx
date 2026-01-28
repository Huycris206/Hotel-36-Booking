import React from 'react'
import axios from 'axios'
const CheckOutBtn = ({ userId, roomId, checkIn, checkOut, totalAmount }) => {
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

      // 2. Tạo payment (chưa thanh toán → pending)
      const paymentRes = await axios.post("http://localhost:5001/api/payments", {
        booking: bookingId,
        amount: totalAmount,
        payment_method: "momo",
        transaction_id: null
      });

      console.log("Booking:", bookingRes.data);
      console.log("Payment:", paymentRes.data);

      alert("Tạo đơn & thanh toán thành công (pending)");

    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra!");
    }
  };
  return (
    <div 
        onClick={handleCheckout}
        className='bg-orange-500 focus:bg-orange-600 hover:bg-orange-600 rounded-2xl border p-6 space-y-4 w-full text-white font-bold text-center'
    >
      Thanh toán
    </div>
  )
}

export default CheckOutBtn
