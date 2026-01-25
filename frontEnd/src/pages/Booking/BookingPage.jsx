import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function BookingPage() {
  const { id } = useParams();

  // Lấy thông tin đăng nhập từ localStorage (đúng thực tế hơn)
  

  // ❌ Chưa đăng nhập → đá về login


  const [type, setType] = useState("hour");

  const handlePayment = () => {
    alert(`Thanh toán thành công cho phòng #${id} (${type})`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Đặt phòng #{id}
        </h1>

        {/* Chọn kiểu đặt phòng */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Kiểu đặt phòng
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="hour">Theo giờ</option>
            <option value="day">Theo ngày</option>
            <option value="night">Qua đêm</option>
          </select>
        </div>

        {/* Thanh toán */}
        <button
          onClick={handlePayment}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
