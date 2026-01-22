import React from 'react';

const RoomTypeFilter = ({ types, selectedType, onSelectType }) => {
  const options = [{ _id: 'All', name: 'Tất cả' }, ...types];  
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {options.map((type) => {
        const isActive = selectedType === type._id;
        
        return (
          <button
            key={type._id}
            onClick={() => {onSelectType(type._id);console.log(type.name)}}
            className={`
              px-5 py-2.5 rounded-xl border-2 font-medium transition-all duration-200
              ${isActive 
                ? 'bg-orange-500 border-orange-500 text-white shadow-lg scale-105' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-orange-200 hover:bg-orange-50'
              }
            `}
          >
            {type.name}
          </button>
        );
      })}
    </div>
  );
};

export default RoomTypeFilter;