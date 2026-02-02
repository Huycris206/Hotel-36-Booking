const toNumber = (value) =>
  value ? Number(value.toString()) : 0;
const calculatePrice = ({ type, bookingType, startAt, endAt }) => {
  const diffMs = endAt - startAt;
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));

  switch (bookingType) {
    case "hour": {
      const firstHour = toNumber(type.price_hourly);
      const extraHour = toNumber(type.price_additional_hour || 0);

      let total = firstHour;
      if (hours > 1) {
        total += (hours - 1) * extraHour;
      }

      return {
        unit: "giờ",
        duration: hours,
        unitPrice: firstHour,
        total,
      };
    }

    case "day":
      return {
        unit: "ngày",
        duration: 1,
        unitPrice: toNumber(type.price_daily),
        total: toNumber(type.price_daily),
      };

    case "night":
      return {
        unit: "đêm",
        duration: 1,
        unitPrice: toNumber(type.price_overnight),
        total: toNumber(type.price_overnight),
      };

    default:
      throw new Error("Loại booking không hợp lệ");
  }
};

export default calculatePrice;
