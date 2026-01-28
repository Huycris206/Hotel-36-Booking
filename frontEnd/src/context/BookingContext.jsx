// context/BookingContext.jsx
import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

const DEFAULT_BOOKING = {
  bookingType: "hour",
  checkIn: null,
  checkOut: null,
  totalTime: 1,
};

export const BookingProvider = ({ children }) => {
  const [bookingType, setBookingType] = useState("hour");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [totalTime, setTotalTime] = useState(1);
  const [currentRoomId, setCurrentRoomId] = useState(null);

const resetBooking = () => {
    setBookingType(DEFAULT_BOOKING.bookingType);
    setCheckIn(DEFAULT_BOOKING.checkIn);
    setCheckOut(DEFAULT_BOOKING.checkOut);
    setTotalTime(DEFAULT_BOOKING.totalTime);
    }; 
  
  return (
    <BookingContext.Provider
      value={{
        bookingType,
        setBookingType,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        totalTime,
        setTotalTime,
        resetBooking,
        currentRoomId,
        setCurrentRoomId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
