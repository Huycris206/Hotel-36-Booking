// services/checkout.service.js
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import calculatePrice  from "../utils/calculatePrice.js";

export const previewCheckoutService = async ({
  roomId,
  bookingType, // hour | day | night
  check_in,
  check_out,
}) => {
  // 1️⃣ Validate
  if (!roomId || !bookingType || !check_in || !check_out) {
    throw new Error("Thiếu thông tin checkout");
  }

  const startAt = new Date(check_in);
  const endAt = new Date(check_out);

  if (endAt <= startAt) {
    throw new Error("Thời gian check-out không hợp lệ");
  }

  // 2️⃣ Fetch room + type
  const room = await Room.findById(roomId).populate("type");
  if (!room) throw new Error("Không tìm thấy phòng");

  // 3️⃣ Check trùng booking
  const conflict = await Booking.findOne({
    room: roomId,
    status: { $in: ["booked", "using"] },
    check_in: { $lt: endAt },
    check_out: { $gt: startAt },
  });

  if (conflict) {
    throw new Error("Phòng đã được đặt trong thời gian này");
  }

  // 4️⃣ Tính giá
  const priceResult = calculatePrice({
    type: room.type,
    bookingType,
    startAt,
    endAt,
  });
  console.log("ROOM TYPE:", room.type);
  // 5️⃣ Trả preview
  return {
    room: {
      id: room._id,
      name: room.name,
      type: room.type,
      image: room.type.image_url,
    },
    booking: {
      bookingType,
      check_in: startAt,
      check_out: endAt,
      duration: priceResult.duration,
      unit: priceResult.unit,
    },
    price: priceResult,
    
  };
  
};
