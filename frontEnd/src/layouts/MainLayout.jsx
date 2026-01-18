import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"; // Bạn sẽ tạo cái này sau
import Footer from "./components/Footer"; // Bạn sẽ tạo cái này sau

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Thanh điều hướng cố định phía trên */}
      <Navbar />

      {/* Nội dung thay đổi theo từng trang nằm ở đây */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer nằm dưới cùng */}
      <Footer />
    </div>
  );
};

export default MainLayout;