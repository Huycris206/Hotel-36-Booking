import { useState,useEffect } from "react";
import { LogIn, LogOut } from "lucide-react";
import { Divider } from "./Divider";
import { Calendar } from "@/components/ui/calendar";
import TimeScroller from "./TimeScroll";
import { useBooking } from "@/context/BookingContext";

export const BookingTime = ({type}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [checkInHour, setCheckInHour] = useState("20:00");
  const [duration, setDuration] = useState(1);
  const [range, setRange] = useState({
    from: undefined,
    to: undefined,
  });
  const { setCheckIn, setCheckOut, setTotalTime } = useBooking();
  



  const HOURS = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00",
                 "08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00",
                 "16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
  const DURATIONSHOUR = [1,2,3,4,6,8,9,10];
  const getCheckInDate = () => {
    if (type === "day") {
      if (!range.from) return null;
      const d = new Date(range.from);
      d.setHours(14, 0, 0, 0); // 14h nhận phòng
      return d;
    }
    const d = new Date(date);

    if (type === "hour") {
      const [h, m] = checkInHour.split(":").map(Number);
      d.setHours(h, m, 0, 0);
    }

    if (type === "night") {
      d.setHours(20, 0, 0, 0);
    }

  

      return d;
  };

  const getCheckoutDate = () => {
    const checkIn = getCheckInDate();
    const checkout = new Date(checkIn);

    if (type === "hour") {
      checkout.setHours(checkout.getHours() + duration);
    }

    if (type === "night") {
      // ví dụ: nhận 20h → trả 8h sáng hôm sau
      checkout.setDate(checkout.getDate() + 1);
      checkout.setHours(8, 0, 0, 0);
    }
    if (type === "day") {
      if (!range.to) return null;
      const d = new Date(range.to);
      d.setHours(14, 0, 0, 0); // 12h trả phòng
      return d;
    }
    

    return checkout;
  };
  
  const isToday =date.toDateString() === new Date().toDateString();

  const AVAILABLE_HOURS = isToday
    ? HOURS.filter(h => {
        const [hour, minute] = h.split(":").map(Number);
        const slot = new Date();
        slot.setHours(hour, minute, 0, 0);
        return slot > new Date();
      })
    : HOURS;


  const formatDateTime = (d) => {
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");

    return `${h}:${m} ${day}/${month}`;
  };
  useEffect(() => {
    setRange(() => {
        const to = new Date(date);
        to.setDate(to.getDate() + 1);
        return { from: date, to };
      });
  }, [type,date])
  const calculateTotalTime = () => {
    if (type === "hour") {
      return duration; // số giờ
    }

    if (type === "night") {
      return 1; // 1 đêm
    }

    if (type === "day" && range.from && range.to) {
      const diffTime = range.to.getTime() - range.from.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }

    return 0;
  };
  useEffect(() => {
    const checkIn = getCheckInDate();
    const checkOut = getCheckoutDate();

    if (checkIn && checkOut) {
      setCheckIn(checkIn);
      setCheckOut(checkOut);
      setTotalTime(calculateTotalTime());
    }
  }, [type, date, duration, range]);

  return (
    <div className="relative">
      {/* Booking bar */}
      <div
        className="flex items-center gap-6 cursor-pointer"
        onClick={() => setOpen(true)}
      >

      <div className="flex items-center gap-2">
        <LogIn size={18} className="text-gray-500" />
        <div>
          <div className="text-xs text-gray-400">Nhận phòng</div>
          <div className="font-medium">
            {getCheckInDate() && formatDateTime(getCheckInDate())}
          </div>
        </div>
      </div>

        <Divider />

        <div className="flex items-center gap-2">
          <LogOut size={18} className="text-gray-500" />
          <div>
            <div className="text-xs text-gray-400">Trả phòng</div>
            <div className="font-medium"> {getCheckoutDate() && formatDateTime(getCheckoutDate())}</div>
          </div>
        </div>
      </div>

      {/* Calendar popover */}
      {open && (
        <div
          className="absolute top-14 right-1 z-50 bg-white rounded-xl shadow-xl p-4 flex"
          onClick={(e) => e.stopPropagation()}
        >
          {type==="hour" && (
            <>
              <div className="shrink-0">
                <Calendar
                  mode="single"
                  selected={date}
                  disabled={{ before: new Date() }}
                  onSelect={(d) => {
                    if (d) setDate(d);
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="font-medium mb-2">GIỜ NHẬN PHÒNG</div>
                <TimeScroller TIMES={AVAILABLE_HOURS} value={checkInHour} onChange={setCheckInHour} />
                <div className="font-medium mb-2">THỜI GIAN SỬ DỤNG</div>
                <TimeScroller TIMES={DURATIONSHOUR} value={duration} onChange={setDuration} />
                <div className="font-medium mb-2">THỜI GIAN TRẢ PHÒNG</div>
                <div>{getCheckoutDate() && formatDateTime(getCheckoutDate())}</div>
              </div>
            </>
          )}

          {type === "night" && (
            <div className="flex flex-col gap-4">
              <Calendar
                mode="single"
                selected={date}
                disabled={{ before: new Date() }}
                onSelect={(d) => d && setDate(d)}
              />

              <div className="text-sm text-gray-600">
                Nhận phòng: <b>20:00</b><br />
                Trả phòng: <b>08:00</b> hôm sau
              </div>
            </div>
          )}

          {type === "day" && (
            <>
              <div>
                <div className="font-medium mb-2">NHẬN PHÒNG</div>
                <Calendar
                  mode="range"
                  selected={range}
                  disabled={{ before: new Date() }}
                  onSelect={setRange}
                  numberOfMonths={2}
                />
              </div>

            </>
          )}

        </div>
      )}

      {/* Click outside to close */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};
