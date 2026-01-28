import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import RoomTypeFilter from './RoomTypeFilter';
import Loadingcomp from '../ui/Loadingcomp';
import { useRooms } from '@/hooks/useRooms';

const RoomList = ({timeType}) => {
  // 1. Khai báo các state quản lý dữ liệu và giao diện
  const [selectedType, setSelectedType] = useState('All');
  const { rooms, typeRooms, loading, error, refetch } = useRooms();

  useEffect(() => {
    console.log("selectedType:", selectedType);
    console.log("room type:", rooms[0]?.type?._id);
  }, []);
  const availableRoomsOnly = rooms.filter(r => r.status === 'available');
  const displayRooms = availableRoomsOnly.filter(room => 
    selectedType === 'All' || String(room.type?._id) === String(selectedType)
  );
  // 4. Xử lý giao diện khi đang tải hoặc gặp lỗi
  if (loading) {
    return (
      <Loadingcomp caigi="phòng" />
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 bg-red-50 rounded-xl border border-red-200">
        <p className="text-red-600 font-medium">{error}</p>
        <button 
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Thử lại
        </button>
      </div>
    );
  }

  // 5. Giao diện chính khi có dữ liệu
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Khám phá phòng trống</h2>
        <span className="text-gray-500">{displayRooms.length} phòng được tìm thấy</span>
      </div>
      <RoomTypeFilter 
          types={typeRooms} 
          selectedType={selectedType} 
          onSelectType={setSelectedType} 
      />
      {rooms.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Hiện tại không có phòng nào khả dụng.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayRooms
             // CHỈ LẤY PHÒNG AVAILABLE
            .map((room) => (
                <RoomCard key={room._id} room={room} timeType={timeType}/>
        ))}
        </div>
      )}
    </div>
    

  );
  
};

export default RoomList;