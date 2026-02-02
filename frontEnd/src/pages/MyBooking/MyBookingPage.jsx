import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import AuroraBg from "@/components/ui/AuroraBg"; // Background hiệu ứng
import Header from "@/components/layout/header/Header"; // Header riêng giống ProfilePage

const MyBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Format tiền tệ
  const formatPrice = (amount) => {
    const value = amount?.$numberDecimal ? parseFloat(amount.$numberDecimal) : amount;
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value || 0);
  };

  // Format ngày
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN", {
       day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  // Fetch dữ liệu
  const fetchMyBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const myData = res.data.filter((b) => {
        const bookingUserId = b.user?._id || b.user;
        return bookingUserId === user?._id;
      });
      setBookings(myData);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi tải lịch sử");
    } finally {
      setLoading(false);
    }
  };

  // Hủy phòng
  const handleCancel = async (id) => {
    if (!window.confirm("Bạn muốn hủy đơn này?")) return;
    try {
      await axios.put(`http://localhost:5001/api/bookings/${id}`, 
        { status: "cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Đã hủy thành công");
      fetchMyBookings(); 
    } catch (err) {
      toast.error("Lỗi hủy phòng");
    }
  };

  useEffect(() => {
    if (user) fetchMyBookings();
  }, []);

  // Lọc theo tab
  const filteredList = bookings.filter(b => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") return b.status === "booked";
    if (activeTab === "staying") return b.status === "using";
    if (activeTab === "completed") return b.status === "completed";
    if (activeTab === "cancelled") return b.status === "cancelled";
    return true;
  });

  if (!user) return <div className="p-20 text-center">Vui lòng đăng nhập!</div>;

  return (
    /* 👇 Cấu trúc giống hệt ProfilePage: AuroraBg > Header > Content */
    <AuroraBg>
      <Header />
      
      <div className="max-w-6xl mx-auto p-4 w-full min-h-[600px] mt-4"> 
        
        <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
            <h1 className="text-3xl font-bold text-gray-800">Lịch Sử Đặt Phòng</h1>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: "all", label: "Tất cả" },
            { id: "upcoming", label: "Sắp tới" },
            { id: "staying", label: "Đang ở" },
            { id: "completed", label: "Hoàn tất" },
            { id: "cancelled", label: "Đã hủy" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full font-semibold transition-all shadow-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white shadow-orange-200"
                  : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DANH SÁCH CARD */}
        <div className="space-y-4">
          {loading ? (
             <div className="text-center py-12 text-gray-500">⏳ Đang tải dữ liệu...</div>
          ) : filteredList.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-12 text-center shadow-sm">
               <p className="text-gray-500 text-lg">Bạn chưa có đơn đặt phòng nào ở mục này.</p>
               <Link to="/" className="text-orange-600 font-bold hover:underline mt-2 inline-block">
                 Đặt phòng ngay
               </Link>
            </div>
          ) : (
            filteredList.map((item) => (
              <div 
                key={item._id} 
                className="group bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/50 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6"
              >
                {/* 🖼️ Cột Trái: Ảnh Phòng */}
                <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden relative shadow-inner">
                  <img 
                    src={item.room?.type?.image_url || "https://via.placeholder.com/400x300?text=KS36"} 
                    alt="Room" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.room?.name || "Phòng ?"}
                  </div>
                </div>

                {/* 📝 Cột Phải: Thông tin */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                              {item.room?.type?.name || "Loại phòng đang cập nhật..."}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1 font-mono">#{item._id.slice(-8).toUpperCase()}</p>
                      </div>
                      
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          item.status === 'booked' ? 'bg-blue-100 text-blue-700' :
                          item.status === 'using' ? 'bg-green-100 text-green-700' :
                          item.status === 'completed' ? 'bg-gray-100 text-gray-500' :
                          'bg-red-50 text-red-500'
                      }`}>
                          {item.status === 'booked' ? 'Sắp tới' :
                           item.status === 'using' ? 'Đang ở' :
                           item.status === 'completed' ? 'Hoàn tất' : 'Đã hủy'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-white/50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Nhận phòng</p>
                          <p className="font-semibold text-gray-800">{formatDate(item.check_in)}</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Trả phòng</p>
                          <p className="font-semibold text-gray-800">{formatDate(item.check_out)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-6 pt-4 border-t border-gray-200/50">
                      <div>
                          <p className="text-xs text-gray-500 mb-1">Tổng thanh toán</p>
                          <p className="text-2xl font-bold text-orange-600">
                              {formatPrice(item.total_amount)}
                          </p>
                      </div>

                      <div className="flex gap-3">
                          {item.status === 'booked' && (
                              <button 
                                  onClick={() => handleCancel(item._id)}
                                  className="px-5 py-2.5 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 hover:border-red-300 transition-all text-sm"
                              >
                                  Hủy phòng
                              </button>
                          )}
                          <Link 
                               to={`/rooms/${item.room?._id}`}
                               className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 transition-all text-sm"
                          >
                              Đặt lại
                          </Link>
                      </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AuroraBg>
  );
};

export default MyBookingPage;