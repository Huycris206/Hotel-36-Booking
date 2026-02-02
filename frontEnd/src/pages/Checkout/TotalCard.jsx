import React from 'react'

const TotalCard = ({total}) => {
  const price=Number(total || 0);
  return (
    <div className='bg-white rounded-2xl border p-6 space-y-4 w-full'>
      <p className="text-lg font-semibold">Chi tiết thanh toán</p>
      <div className='flex justify-between items-center '>
        <p>tiền phòng </p>
        <div className='text-lg font-semibold'> {price.toLocaleString("vi-VN")} đ</div>
      </div>
    </div>
  )
}

export default TotalCard
