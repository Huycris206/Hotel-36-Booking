import mongoose from 'mongoose';
import Room from './src/models/Room.js'; // Đường dẫn tới file Model Room của bạn
import TypeRoom from './src/models/TypeRoom.js'; // Đường dẫn tới file Model TypeRoom của bạn

// 1. Kết nối tới MongoDB (Thay đổi URI cho đúng với máy bạn)

import dotenv from 'dotenv';
dotenv.config(); // Dòng này cực kỳ quan trọng, nó nạp dữ liệu từ .env vào process.env
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("Đã kết nối để tạo dữ liệu mẫu...");

    // Xóa dữ liệu cũ để tránh trùng lặp khi test
    await Room.deleteMany({});
    await TypeRoom.deleteMany({});

    // 2. Tạo 3 loại phòng (TypeRoom)
    const typeRooms = await TypeRoom.insertMany([
      {
        name: "Phòng Standard (Đơn)",
        amenities: { wifi: true, tv: true, ac: false },
        price_hourly: 70000,
        price_daily: 300000,
        price_overnight: 170000,
        image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800"
      },
      {
        name: "Phòng Deluxe (Đôi)",
        amenities: { wifi: true, tv: true, ac: true, minibar: true },
        price_hourly: 100000,
        price_daily: 550000,
        price_overnight: 300000,
        image_url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800"
      },
      {
        name: "Phòng Suite (VIP)",
        amenities: { wifi: true, tv: true, ac: true, jacuzzi: true, balcony: true },
        price_hourly: 200000,
        price_daily: 1200000,
        price_overnight: 800000,
        image_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800"
      }
    ]);

    console.log("Đã tạo xong 3 loại phòng!");

    // 3. Tạo 3 phòng cho mỗi loại (Tổng 9 phòng)
    const roomsToCreate = [];

    typeRooms.forEach((type) => {
      // Mỗi loại phòng tạo 3 phòng cụ thể
      for (let i = 1; i <= 3; i++) {
        roomsToCreate.push({
          name: `Phòng ${type.name.split(' ')[1]} ${100 + i}`, // Ví dụ: Phòng Standard 101, 102...
          type: type._id, // Gán ID của loại phòng vào đây
          status: 'available'
        });
      }
    });

    await Room.insertMany(roomsToCreate);
    console.log(`Đã tạo xong ${roomsToCreate.length} phòng cụ thể!`);

    mongoose.connection.close();
    console.log("Đã đóng kết nối. Hoàn tất!");

  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu:", error);
    process.exit(1);
  }
};

seedData();