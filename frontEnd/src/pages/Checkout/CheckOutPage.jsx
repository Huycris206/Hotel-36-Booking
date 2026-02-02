import Header from "@/components/layout/header/Header";
import AuroraBg from "@/components/ui/AuroraBg";
import { useState,useEffect,useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CheckOutCard from "./CheckOutCard";
import UserCard from "./UserCard";
import TotalCard from "./TotalCard";

import { AuthContext } from '@/context/AuthContext'
import CheckOutBtn from "./CheckOutBtn";

export default function CheckOutPage() {
  const [searchParams] = useSearchParams();
  const {user}=useContext(AuthContext);
  const roomId = searchParams.get("roomId");
  const bookingType = searchParams.get("type");
  const check_in = searchParams.get("checkIn");
  const check_out = searchParams.get("checkOut");
  const totalTime=searchParams.get("totalTime");

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!roomId || !bookingType || !check_in || !check_out){
      setLoading(false);
      setError("Thiếu thông tin đặt phòng");
      return;
    }

    axios
      .post("http://localhost:5001/api/checkout/preview", {
        roomId,
        bookingType,
        check_in,
        check_out,
      })
      .then((res) => setPreview(res.data.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Lỗi checkout")
      )
      .finally(() => setLoading(false));
  }, [roomId, bookingType, check_in, check_out]);

  return (
    <AuroraBg>
      <Header />

      <div className="max-w-screen-xl w-full mx-auto px-6 py-8 ">
        {loading && <div>Đang tính giá...</div>}

        {error && <div className="text-red-500">{error}</div>}
      

        {preview && (
          
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* CỘT TRÁI */}
            <div className="lg:col-span-7 space-y-6 ">
              <CheckOutCard room={preview?.room} checkIn={check_in} checkOut={check_out} type={bookingType} duration={totalTime} ></CheckOutCard>
              <UserCard userName={user.name} phone={user.number_phone} ></UserCard>
              {/* card 2 */}
              {/* card 3 */}
            </div>

            {/* CỘT PHẢI */}
            <div className="lg:col-span-5 space-y-6">
              <TotalCard total={preview?.price.total}></TotalCard>
              {/* phương thức thanh toán */} 
              <CheckOutBtn userId={user._id} checkIn={check_in} checkOut={check_out} totalAmount={preview?.price.total} roomId={roomId}></CheckOutBtn>
              {/* nút thanh toán */}
            </div>

          </div>
  
          
        )}
      </div>
    </AuroraBg>
  );
}

