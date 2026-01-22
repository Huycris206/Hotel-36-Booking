import React from 'react';
import { Search, Globe, User } from 'lucide-react'; // Sử dụng Lucide-react cho icon
import Logo from './Logo';
import { Link  } from "react-router-dom";
import LoginBtn from '../LogInBtn';
import SignInBtn from '../SignInBtn';
import ProfileBtn from '../ProfileBtn';
import LogoutBtn from '../LogOutBtn';
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
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
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <ProfileBtn name={user.name} />
              <LogoutBtn onLogout={logout} />
            </>
          ) : (
            <>
              <LoginBtn /> 
              <SignInBtn />
            </>
          )}
           
        </div>
      </div>
    </header>
  );
};

export default Header;