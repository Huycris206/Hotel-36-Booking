import { BookingTime } from "./BookingTime";
import { Divider } from "./Divider";
import {
  Hourglass,
  Moon,
  CalendarDays,
  MapPin,
  LogIn,
  LogOut,
} from "lucide-react";

export default function BookingBar({room,type,setType,toTalTime}) {
  
  return (
    <div className="w-full bg-white rounded-full shadow flex items-center px-6 py-3 gap-6">
      {/* Tabs */}
      <div className="flex items-center gap-6 flex-1">
        <Tab icon={<Hourglass size={22} />} 
          label="Theo giờ"
          active={type==="hour"}
          onClick={() => setType("hour")} />
        <Tab icon={<Moon size={22} />} 
          label="Qua đêm"
          active={type==="night"}
          onClick={()=>setType("night")} />
        <Tab icon={<CalendarDays size={22} />} 
          label="Theo ngày"
          active={type==="day"}
          onClick={()=>setType("day")} />
      </div>


      {/* Location */}
      {room && (
        <>
          <Divider />
          <div className="flex items-center gap-2 min-w-[220px] flex-1">
            <MapPin size={18} className="text-gray-500" />
            <div>
              <div className="text-xs text-gray-400">Phòng</div>
              <div className="font-medium">{room}</div>
            </div>
          </div>
        </>
      )}
      <Divider />

      <div className="flex-1">
        <BookingTime type={type} onChangeTotalTime={toTalTime} />
      </div>

      {/* Button */}
      <div className="ml-auto">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium">
          Cập nhật
        </button>
      </div>
    </div>
  );
}

/* ===== Sub components ===== */

function Tab({ icon, label, active,onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 pb-1 border-b-2 transition
        ${
          active
            ? "border-orange-500 text-orange-500"
            : "border-transparent text-gray-500 hover:text-orange-500"
        }
      `}
    >
      {icon}  
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}


