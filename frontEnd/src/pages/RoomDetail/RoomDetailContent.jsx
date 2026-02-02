import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Đảm bảo đã import useNavigate
import axios from "axios";
import AuroraBg from "@/components/ui/AuroraBg";
import HeaderBooking from "@/components/layout/headerBooking/HeaderBook";
import Footer from "@/components/layout/Footer";
import RoomPriceEstimate from "./RoomPriceEstimate";
import { useBooking } from "@/context/BookingContext";

export default function RoomDetailContent() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("hour");
  
  const { checkIn, checkOut, totalTime } = useBooking();
  const navigate = useNavigate();
  const { resetBooking } = useBooking();
  
  // 👇 Lấy user để kiểm tra đăng nhập
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết phòng", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  useEffect(() => {
    resetBooking();
  }, [id]);

  if (loading) return <div className="p-6 text-white">Đang tải...</div>;
  if (!room || !room.type) return <div className="p-6 text-white">Không tìm thấy phòng</div>;

  // Xử lý khi bấm nút Đặt phòng
  const handleBookClick = () => {
    // 1. Kiểm tra đăng nhập
    if (!user) {
      alert("Bạn cần đăng nhập để đặt phòng!");
      navigate("/"); // Quay về trang chủ
      return;
    }

    // 2. Nếu đã đăng nhập thì sang trang Checkout
    const params = new URLSearchParams({
      roomId: room._id,
      type,
      totalTime,
      checkIn: checkIn?.toISOString(),
      checkOut: checkOut?.toISOString(),
    }).toString();

    navigate(`/checkout/${room._id}?${params}`);
  };

  return (
      <AuroraBg>
        <HeaderBooking roomName={room.name} type={type} setType={setType}  />
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
            <img
              src={room.type.image_url}
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              alt={room.name}
            />

            <div className="flex items-center justify-between text-3xl font-bold text-gray-800">
              <h1>{room.name}</h1>
              <RoomPriceEstimate
                roomType={room.type}
                type={type}
                totalTime={totalTime}
              />
            </div>

            <p className="text-gray-600 font-medium">
              Loại phòng: <span className="text-orange-600">{room.type.name}</span>
            </p>

            <div className="flex items-center justify-between bg-white/50 p-6 rounded-xl backdrop-blur-sm">
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">Tiện ích</h3>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                  {room.type.amenities?.wifi && <li>WiFi tốc độ cao</li>}
                  {room.type.amenities?.tv && <li>Smart TV</li>}
                  {room.type.amenities?.ac && <li>Máy lạnh 2 chiều</li>}
                </ul>
              </div>
              
              {/* 👇 Gán hàm xử lý mới vào nút này */}
              <button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-transform transform hover:scale-105" 
                onClick={handleBookClick}
              >
                Đặt phòng ngay
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </AuroraBg>
  );
}