export default function RoomPriceEstimate({ roomType, type, totalTime }) {
  if (!roomType) return null;

  const suffixMap = {
    hour: "giờ",
    day: "ngày",
    night: "đêm",
  };

  const calcEstimatePrice = () => {
    if (type === "hour") {
      const firstHour = Number(roomType.price_hourly?.$numberDecimal || 0);
      const extraHour = Number(
        roomType.price_additional_hour?.$numberDecimal || 0
      );

      if (totalTime <= 1) return firstHour;
      return firstHour + (totalTime - 1) * extraHour;
    }

    if (type === "day") {
      return Number(roomType.price_daily?.$numberDecimal || 0);
    }

    if (type === "night") {
      return Number(roomType.price_overnight?.$numberDecimal || 0);
    }

    return 0;
  };

  const estimatePrice = calcEstimatePrice();

  return (
    <div className="text-right">
      <div className="text-orange-500 text-2xl font-bold">
        {estimatePrice
          ? `${estimatePrice.toLocaleString()} VND/ ${totalTime} ${suffixMap[type]}` 
          : "Chưa có giá"}
      </div>

      
    </div>
  );
}
