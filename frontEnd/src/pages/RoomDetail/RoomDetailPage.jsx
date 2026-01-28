import { BookingProvider } from "@/context/BookingContext";
import RoomDetailContent from "./RoomDetailContent";

export default function RoomDetailPage() {
  return (
    <BookingProvider>
      <RoomDetailContent />
    </BookingProvider>
  );
}
