import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  // room.type là dữ liệu từ Model TypeRoom sau khi populate
  const roomType = room.type; 

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={roomType?.image_url || "/placeholder-room.jpg"} // Sử dụng image_url từ TypeRoom
        alt={room.name}
        className="h-40 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{room.name}</h3>
        <p className="text-sm text-gray-500">{roomType?.name}</p>

        <div className="flex justify-between items-center pt-2">
          <span className="text-orange-500 font-bold">
            {/* Vì Decimal128 trả về dạng string/object, cần ép kiểu số để toLocaleString */}
            {Number(roomType?.price_daily?.$numberDecimal).toLocaleString()}đ / ngày
          </span>
          <span className={`text-sm px-2 py-1 rounded ${
            room.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {room.status === 'available' ? 'Còn trống' : 'Đang sử dụng'}
          </span>
        </div>

        <Link
          to={`/rooms/${room._id}`}
          className="block w-full mt-3 bg-orange-500 text-white py-2 rounded text-center hover:bg-orange-600"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;