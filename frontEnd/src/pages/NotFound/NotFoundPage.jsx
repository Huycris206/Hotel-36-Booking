import React from "react";
import NotFoundImage from "../../assets/notFound.jpg";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50 w-screen">
      <img
        src={NotFoundImage}
        alt="not found"
        className="max-w-full mb-6 w-96"
      />

      <p className="text-xl font-semibold">
        Bạn đang đi vào vùng cấm địa 🚫
      </p>

      <a href="/" className="inline-block px-6 py-3 mt-6 font-medium text-white transition bg-black rounded-lg hover:bg-blue-700">
        Quay lại trang chủ
      </a>
    </div>
  );
};

export default NotFound;