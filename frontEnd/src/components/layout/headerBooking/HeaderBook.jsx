import React from 'react';
import { Search, Globe, User } from 'lucide-react'; // Sử dụng Lucide-react cho icon

import { Link  } from "react-router-dom";
import LoginBtn from '../../ui/LogInBtn';
import SignInBtn from '../../ui/SignInBtn';
import ProfileBtn from '../../ui/ProfileBtn';
import LogoutBtn from '../../ui/LogOutBtn';
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Loadingcomp from '../../ui/Loadingcomp';
import BookingBar from './BookingBar';
import UserMenu from './UserMenu';
import Logo from '../header/Logo';

const HeaderBooking = ({roomName,type,setType,totalTime}) => {
  const { user, logout,loading } = useContext(AuthContext);

  if (loading) return <Loadingcomp caigi="header" />;
  return (
    <header className=" text-black py-3 px-4 md:px-8 sticky top-0 z-50 border-b border-gray-800">
      <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(150deg, #B39DDB 0%, #D1C4E9 20%, #F3E5F5 40%, #FCE4EC 60%, #FFCDD2 80%, #FFAB91 100%)`,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Logo></Logo>
        <BookingBar room={roomName} type={type} setType={setType} toTalTime={totalTime}/>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <ProfileBtn name={user.name}  />
              <LogoutBtn onLogout={logout} />
            </>
          ) : (
            <>
              <UserMenu />
            </>
          )}
          {user?.role==='admin' && (
            <Link to="/admin/rooms" className="hidden md:inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 shadow">
              admin
            </Link>
          )}
          
           
        </div>
      </div>
    </header>
  );
};

export default HeaderBooking;