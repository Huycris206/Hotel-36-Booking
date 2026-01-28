import React from 'react'
import { useContext } from "react";
import { AuthContext } from '@/context/AuthContext'
const UserCard = () => {
    const {user} =useContext(AuthContext);
  return (
    <div className='bg-white rounded-2xl border p-6 space-y-4'>
      <h3 className="text-lg font-semibold">Người đặt phòng</h3>
      <div className='flex flex-col gap-4'>
        <div className="flex justify-between items-center">
            <p>họ tên</p>
            <div>{user.name}</div>
        </div>
        <div className="flex justify-between items-center">
            <p>số điện thoại</p>
            <div>{user.number_phone}</div>
        </div>
      </div>
    </div>
    
  )
}

export default UserCard
