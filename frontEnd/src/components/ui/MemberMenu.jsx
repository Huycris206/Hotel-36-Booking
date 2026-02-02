import {  useEffect, useRef, useState } from "react";
import { Menu,User,Calendar1 } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileBtn from "./ProfileBtn";
import LogoutBtn from "./LogOutBtn";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const MemberMenu = ({logOut}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <div className="relative" ref={menuRef}>
      {/* Button 3 sọc */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <User size={22} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg py-2 z-50 flex flex-col gap-4">
          <ProfileBtn className="flex items-center"></ProfileBtn>

          <Link
            to="/my-booking"
            className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-3"
          >
            <Calendar1 size={22}></Calendar1>
            Đặt phòng của tôi
          </Link>
          <LogoutBtn onLogout={logOut}></LogoutBtn>
        </div>
      )}
    </div>
  )
}

export default MemberMenu
