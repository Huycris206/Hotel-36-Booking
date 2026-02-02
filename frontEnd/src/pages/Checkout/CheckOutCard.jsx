import React from 'react'
import { Clock, Heart,Calendar,Moon } from "lucide-react";

const CheckOutCard = ({room, checkIn, checkOut, type, duration}) => {
    const formatDateTime = (value) => {
        if (!value) return "";

        const date = new Date(value);

        const time = date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const day = date.toLocaleDateString("vi-VN");

    return `${time} · ${day}`;
    };
    const  typeBookBox=(type)=> {
        if(!type) return null;
        if(type==="hour")
            return(
                <div
                    className="w-24 h-32 rounded-xl 
                            bg-gradient-to-b from-orange-400 to-orange-300
                            flex flex-col items-center justify-center
                            text-white relative"
                >
                    {/* Tim góc phải */}
                    <Heart className="absolute top-2 right-2 w-4 h-4 fill-white text-white" />

                    {/* Đồng hồ */}
                    <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5" />
                    </div>

                    <div className="text-sm font-semibold"> {duration} giờ</div>
                </div>
            )
        if(type==="day")
            return(
                <div
                    className="w-24 h-32 rounded-xl 
                            bg-gradient-to-b from-green-400 to-green-300
                            flex flex-col items-center justify-center
                            text-white relative"
                >
                    {/* Tim góc phải */}
                    <Heart className="absolute top-2 right-2 w-4 h-4 fill-white text-white" />

                    {/* Đồng hồ */}
                    <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5" />
                    </div>

                    <div className="text-sm font-semibold"> {duration} ngày</div>
                </div>
            )
        if(type==="night")
            return(
                <div
                    className="w-24 h-32 rounded-xl 
                            bg-gradient-to-b from-violet-400 to-violet-300
                            flex flex-col items-center justify-center
                            text-white relative"
                >
                    {/* Tim góc phải */}
                    <Heart className="absolute top-2 right-2 w-4 h-4 fill-white text-white" />

                    {/* Đồng hồ */}
                    <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center mb-2">
                    <Moon className="w-5 h-5" />
                    </div>

                
                </div>
            )
    }

   const roomType=room?.type;
  return (
    <div className="bg-white rounded-2xl border p-6 space-y-4 w-full">
    <h3 className="text-lg font-semibold">Lựa chọn của bạn</h3>

    <div className="flex flex-col gap-4">
        <div className='flex gap-10'>
            <img
            src={roomType?.image_url || "/placeholder-room.jpg"} // Sử dụng image_url từ TypeRoom
            alt={room?.name}
            className="h-20 w-35 object-cover"
        />

            <div className="flex flex-col gap-5">
                <div className="font-semibold">{room?.name}</div>
                <div className="text-orange-500 font-medium">{roomType?.name}</div>
            </div>
        </div>
    <div className="flex gap-4 bg-white rounded-2xl border p-4">

  
        {typeBookBox(type)}

        {/* BÊN PHẢI – THÔNG TIN */}
        <div className="flex-1 bg-gray-50 rounded-xl p-4 space-y-3">
            <div>
            <p className="text-sm text-gray-500">Nhận phòng</p>
            <p className="font-semibold">{formatDateTime(checkIn)}</p>
            </div>

            <div>
            <p className="text-sm text-gray-500">Trả phòng</p>
            <p className="font-semibold">{formatDateTime(checkOut)}</p>
            </div>
        </div>

        </div>

            </div>
    </div>

  )
}

export default CheckOutCard
