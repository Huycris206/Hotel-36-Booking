import React from 'react';
import { Search, Globe, User } from 'lucide-react'; // Sử dụng Lucide-react cho icon

const Header = () => {
  return (
    <header className=" text-black py-3 px-4 md:px-8 sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo & Partner Link */}
        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold text-orange-500 cursor-pointer">Go2Joy</div>
          <a href="#" className="hidden lg:block text-sm hover:text-orange-400 transition">
            Dành cho đối tác
          </a>
        </div>

        {/* Thanh tìm kiếm (Search Bar) - Căn giữa */}
        <div className="flex-1 max-w-xl hidden md:flex items-center bg-[#2a2a2a] rounded-full px-4 py-2 border border-transparent focus-within:border-orange-500 transition">
          <input 
            type="text" 
            placeholder="Bạn muốn đi đâu?" 
            className="bg-transparent border-none focus:outline-none w-full text-sm"
          />
          <div className="h-4 w-[1px] bg-gray-600 mx-3"></div>
          <span className="text-xs text-gray-400 whitespace-nowrap">Theo giờ • Bất kỳ</span>
          <button className="ml-3 bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition">
            <Search size={16} />
          </button>
        </div>

        {/* Auth Buttons & Language */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer hover:text-orange-400 transition">
            <Globe size={18} />
            <span className="text-sm">Tiếng Việt</span>
          </div>
          <button className="text-orange-500 font-medium hover:text-orange-400">Đăng nhập</button>
          <button className="bg-white text-orange-500 border border-orange-500 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-orange-500 hover:text-white transition">
            Đăng ký
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;