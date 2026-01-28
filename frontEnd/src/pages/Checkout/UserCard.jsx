import React from 'react'

const UserCard = ({userName,phone}) => {
  return (
    <div className='bg-white rounded-2xl border p-6 space-y-4'>
      <h3 className="text-lg font-semibold">Người đặt phòng</h3>
      <div className='flex flex-col gap-4'>
        <div className="flex justify-between items-center">
            <p>họ tên</p>
            <div>{userName}</div>
        </div>
        <div className="flex justify-between items-center">
            <p>số điện thoại</p>
            <div>{phone}</div>
        </div>
      </div>
    </div>
    
  )
}

export default UserCard
