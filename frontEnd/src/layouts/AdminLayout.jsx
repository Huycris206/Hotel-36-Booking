import { Outlet, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import {  useContext } from "react";
const AdminLayout = () => {
  const navigate = useNavigate();
 
  const { logout, user} = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full shadow-lg">
        <div className="h-20 flex items-center justify-center text-2xl font-bold border-b border-gray-700 bg-gray-800">
          Admin Panel
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          {/* Mặc định vào quản lý phòng luôn */}
          <Link to="/admin/rooms" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition">🏨 Quản lý Phòng</Link>
          <Link to="/admin/users" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition">👥 Quản lý User</Link>
          <Link to="/admin/bookings" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition">📅 Đơn đặt phòng</Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link to="/" className="block mb-4 px-4 py-3 rounded-lg bg-green-600 hover:bg-green-800 text-center transition">
            🏠 Về trang chủ
          </Link>
          <button onClick={handleLogout} className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition">
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8 pb-4 border-b bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Hệ Thống Quản Trị</h2>
          <div className="flex items-center space-x-3">
            <span className="font-medium text-gray-600">Admin: {user?.username}</span>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">A</div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;