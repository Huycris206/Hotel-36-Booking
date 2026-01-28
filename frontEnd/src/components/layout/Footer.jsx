import React from 'react';
const Footer = () => {
  return (
    <footer className=" text-gray-400 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top Footer: Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Cột 1: Hỗ trợ */}
          <div>
            <h4 className="text-white font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>Hotline: <span className="text-white">1900 638 838</span></li>
              <li className="hover:text-white cursor-pointer transition">Hỗ trợ khách hàng: cskh@go2joy.vn</li>
              <li className="hover:text-white cursor-pointer transition">Liên hệ hợp tác: support@go2joy.vn</li>
              <li className="hover:text-white cursor-pointer transition">Cơ chế giải quyết tranh chấp</li>
            </ul>
          </div>

          {/* Cột 2: Giới thiệu */}
          <div>
            <h4 className="text-white font-bold mb-4">Giới thiệu</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition">Về chúng tôi</li>
              <li className="hover:text-white cursor-pointer transition">Trang blog</li>
              <li className="hover:text-white cursor-pointer transition">Quy chế hoạt động</li>
              <li className="hover:text-white cursor-pointer transition">Cơ hội nghề nghiệp</li>
            </ul>
          </div>

          {/* Cột 3: Thanh toán */}
          <div>
            <h4 className="text-white font-bold mb-4">Đối tác thanh toán</h4>
            <div className="flex flex-wrap gap-3 grayscale hover:grayscale-0 transition cursor-pointer">
              {/* Thay bằng ảnh thật của các đối tác ví điện tử */}
              <div className="w-10 h-6 bg-white rounded"></div>
              <div className="w-10 h-6 bg-white rounded"></div>
              <div className="w-10 h-6 bg-white rounded"></div>
            </div>
          </div>

          {/* Cột 4: Ứng dụng */}
          <div>
            <h4 className="text-white font-bold mb-4">Tải ứng dụng</h4>
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-white p-1">QR</div>
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-gray-700 rounded">App Store</div>
                <div className="w-24 h-8 bg-gray-700 rounded">Google Play</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer: Company Info */}
        <div className="border-t border-gray-800 pt-8 text-center text-xs space-y-2">
          <p className="font-bold text-gray-300">CÔNG TY CỔ PHẦN GO2JOY VIỆT NAM</p>
          <p>Địa chỉ trụ sở: 5A/2 đường Trần Phú, Phường Chợ Quán, Thành Phố Hồ Chí Minh, Việt Nam.</p>
          <p>Người đại diện theo pháp luật: BYUN SUNG MIN — chức vụ: Tổng Giám Đốc</p>
          <p>Mã số thuế: 0311850218 do Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh cấp lần đầu ngày 11/06/2012</p>
          <p className="mt-4 opacity-50">Copyright © 2023 GO2JOY Vietnam, Jsc. · Điều khoản · Bảo mật</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;