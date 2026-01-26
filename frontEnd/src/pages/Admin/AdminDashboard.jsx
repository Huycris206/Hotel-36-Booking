import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar bên trái */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <a href="#" className="block px-4 py-2 rounded bg-gray-900 text-white">Dashboard</a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">Quản lý Phòng</a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">Quản lý User</a>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700">Đơn đặt phòng</a>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Nội dung chính bên phải */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tổng quan</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-600">Xin chào, {user?.username || 'Sếp'}</span>
            <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Mấy cái thẻ thống kê (Mock data) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-medium">Tổng người dùng</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">1,250</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">Doanh thu tháng</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">50.000.000đ</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
            <h3 className="text-gray-500 text-sm font-medium">Phòng đang thuê</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">18/30</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Hoạt động gần đây</h2>
          <p className="text-gray-500">Chưa có dữ liệu...</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;