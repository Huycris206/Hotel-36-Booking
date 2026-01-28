import { useEffect, useState } from "react";
import axios from "axios";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // 1. Lấy danh sách Booking
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Lỗi lấy booking:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 2. Hàm xử lý hiển thị dữ liệu
  const formatDate = (dateString) => {
    if (!dateString) return "---";
    return new Date(dateString).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (amount) => {
    if (!amount) return "0";
    // Xử lý Decimal128 của MongoDB
    const value = amount.$numberDecimal ? parseFloat(amount.$numberDecimal) : amount;
    return parseFloat(value).toLocaleString("vi-VN");
  };

  // 3. Cập nhật trạng thái đơn (Duyệt / Hủy)
  const handleUpdateStatus = async (id, newStatus) => {
    if(!window.confirm(`Bạn muốn đổi trạng thái thành "${newStatus}"?`)) return;
    
    try {
      await axios.put(`http://localhost:5001/api/bookings/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Cập nhật thành công!");
      fetchBookings(); // Load lại data
    } catch (err) {
      alert("Lỗi cập nhật: " + (err.response?.data?.message || err.message));
    }
  };

  // 4. Xóa đơn
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa đơn đặt phòng này?")) {
      try {
        await axios.delete(`http://localhost:5001/api/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(bookings.filter((b) => b._id !== id));
        alert("Đã xóa đơn hàng!");
      } catch (err) {
        alert("Không thể xóa đơn đang hoạt động!");
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">⏳ Đang tải dữ liệu...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Đặt Phòng</h2>
        <span className="bg-orange-100 text-orange-800 py-1 px-3 rounded-full text-sm font-bold">
          Tổng đơn: {bookings.length}
        </span>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Chưa có đơn đặt phòng nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-orange-50 border-b border-orange-200 text-orange-800 uppercase text-xs font-bold">
                <th className="py-3 px-4">Mã Đơn</th>
                <th className="py-3 px-4">Khách Hàng</th>
                <th className="py-3 px-4">Phòng</th>
                <th className="py-3 px-4">Check-in</th>
                <th className="py-3 px-4">Check-out</th>
                <th className="py-3 px-4">Tổng Tiền</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {bookings.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                  {/* Mã đơn rút gọn */}
                  <td className="py-3 px-4 font-mono text-xs text-gray-500">
                    #{item._id.slice(-6).toUpperCase()}
                  </td>
                  
                  {/* Thông tin khách (Tên + SĐT) */}
                  <td className="py-3 px-4">
                    <p className="font-bold text-gray-800">{item.user?.name || "Khách vãng lai"}</p>
                    <p className="text-xs text-gray-500">{item.user?.number_phone || "---"}</p>
                  </td>
                  
                  {/* Tên phòng */}
                  <td className="py-3 px-4 font-medium text-blue-600">
                    {item.room?.name || "Phòng đã xóa"}
                  </td>

                  {/* Ngày giờ */}
                  <td className="py-3 px-4 whitespace-nowrap">{formatDate(item.check_in)}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{formatDate(item.check_out)}</td>
                  
                  {/* Tổng tiền */}
                  <td className="py-3 px-4 font-bold text-green-600 text-base">
                    {formatPrice(item.total_amount)}đ
                  </td>

                  {/* Trạng thái (Có màu sắc) */}
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      item.status === 'booked' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'using' ? 'bg-green-100 text-green-700' :
                      item.status === 'completed' ? 'bg-gray-200 text-gray-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'booked' ? 'Đã đặt' : 
                       item.status === 'using' ? 'Đang ở' :
                       item.status === 'completed' ? 'Hoàn tất' : item.status}
                    </span>
                  </td>

                  {/* Nút hành động */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      {/* Dropdown đổi trạng thái nhanh */}
                      <select 
                        className="text-xs border rounded p-1 outline-none bg-white hover:border-orange-500"
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item._id, e.target.value)}
                      >
                        <option value="booked">Đặt</option>
                        <option value="using">Nhận phòng</option>
                        <option value="completed">Trả phòng</option>
                        <option value="cancelled">Hủy</option>
                      </select>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Xóa đơn"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;