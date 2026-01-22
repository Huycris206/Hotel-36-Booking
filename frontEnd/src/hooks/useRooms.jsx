import { useEffect, useState } from "react";
import axios from "axios";

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [typeRooms, setTypeRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const [roomsRes, typesRes] = await Promise.all([
        axios.get("http://localhost:5001/api/rooms"),
        axios.get("http://localhost:5001/api/TypeRooms"),
      ]);

      setRooms(roomsRes.data);
      setTypeRooms(typesRes.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách phòng:", err);
      setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    typeRooms,
    loading,
    error,
    refetch: fetchRooms,
  };
};
