import {  useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);


  // Click ngoài thì đóng menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Button 3 sọc */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <Menu size={22} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg py-2 z-50">
          <Link
            to="/login"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Đăng nhập
          </Link>

          <Link
            to="/register"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Đăng ký
          </Link>
        </div>
      )}
    </div>
  );
}
