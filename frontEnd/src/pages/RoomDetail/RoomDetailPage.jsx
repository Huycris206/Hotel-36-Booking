import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AuroraBg from "@/components/ui/AuroraBg";
import HeaderBooking from "@/components/layout/headerBooking/HeaderBook";
import Footer from "@/components/layout/Footer";

export default function RoomDetailPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("hour");
  const [totalTime, setTotalTime] = useState(1);
  
  
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/rooms/${id}`
        );
        setRoom(res.data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết phòng", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!room || !room.type)
    return <div className="p-6">Không tìm thấy phòng</div>;

  const priceMap = {
    hour: room.type.price_hourly,
    day: room.type.price_daily,
    night: room.type.price_overnight,
  };

  const suffixMap = {
    hour: "giờ",
    day: "ngày",
    night: "đêm",
  };
  const unitPrice = priceMap[type]?.$numberDecimal;
  const totalPrice = unitPrice * totalTime;
  const priceText = totalPrice
    ? `${Number(totalPrice).toLocaleString()} VND/${totalTime} ${ suffixMap[type]}`
    : "Chưa có giá";
  return (
    <AuroraBg>
      <HeaderBooking roomName={room.name} type={type} setType={setType} totalTime={setTotalTime}  />
      <div className="flex-1 flex justify-center">
        
        <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
          <img
            src={room.type.image_url}
            className="w-full h-[400px] object-cover rounded-xl"
          />

          <div className="flex items-center justify-between text-3xl font-bold">
            <h1 className="">{room.name}</h1>
            <div className="text-orange-500">{priceText}</div>
          </div>

          <p className="text-gray-600">
            Loại phòng: {room.type.name}
          </p>

          <div className="flex items-center justify-between ">
            <div>
              <h3 className="font-semibold mb-2">Tiện ích</h3>
              <ul className="list-disc ml-6">
                {room.type.amenities?.wifi && <li>WiFi miễn phí</li>}
                {room.type.amenities?.tv && <li>TV</li>}
                {room.type.amenities?.ac && <li>Máy lạnh</li>}
              </ul>
            </div>


            <Link to={`/booking/${room._id}`}>
              <button className="bg-orange-500 text-white px-6 py-3 rounded">
                Đặt phòng
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </AuroraBg>
  );
}
