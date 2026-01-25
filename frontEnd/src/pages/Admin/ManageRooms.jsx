import { useEffect, useState } from "react";
import axios from "axios";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [types, setTypes] = useState([]); // Lưu danh sách loại phòng để chọn
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  // Form thêm phòng (khớp với model Backend: name, type)
  const [formData, setFormData] = useState({
    name: "",
    type: "", // Sẽ lưu ID của loại phòng
    status: "available"
  });

  // 1. Lấy danh sách Phòng và Loại Phòng
  const fetchData = async () => {
    try {
      const [roomsRes, typesRes] = await Promise.all([
        axios.get("http://localhost:5001/api/rooms"),
        // Giả định bạn có API lấy loại phòng. Nếu chưa có API này thì báo tôi nhé!
        axios.get("http://localhost:5001/api/typerooms") 
      ]);
      
      setRooms(roomsRes.data);
      setTypes(typesRes.data);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Xử lý thêm phòng
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.type) {
      alert("Vui lòng chọn loại phòng!");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/rooms", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Thêm phòng thành công!");
      setShowModal(false);
      fetchData(); // Load lại
      setFormData({ name: "", type: "", status: "available" }); // Reset form
    } catch (err) {
      console.error(err);
      alert("Lỗi: " + (err.response?.data?.message || err.message));
    }
  };

  // 3. Xử lý xóa phòng
  const handleDelete = async (id) => {
    if (!window.confirm("Xóa phòng này nhé?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(rooms.filter(r => r._id !== id));
    } catch (err) {
      alert("Lỗi xóa phòng!");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Phòng</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow"
        >
          + Thêm Phòng
        </button>
      </div>

      {loading ? <p>Đang tải dữ liệu...</p> : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-600 uppercase text-sm">
              <th className="p-3">Tên Phòng</th>
              <th className="p-3">Loại Phòng</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{room.name}</td>
                {/* Check null optional chaining để không lỗi */}
                <td className="p-3 text-blue-600">{room.type?.name || "---"}</td> 
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    room.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {room.status}
                  </span>
                </td>
                <td className="p-3">
                  <button onClick={() => handleDelete(room._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL THÊM PHÒNG */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Thêm Phòng Mới</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              
              {/* Nhập tên phòng */}
              <div>
                <label className="block text-sm font-medium mb-1">Tên phòng</label>
                <input 
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="VD: Phòng 101" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>

              {/* Chọn loại phòng (Dropdown) */}
              <div>
                <label className="block text-sm font-medium mb-1">Loại phòng</label>
                <select 
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  required
                >
                  <option value="">-- Chọn loại phòng --</option>
                  {types.map(t => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </select>
                {types.length === 0 && <p className="text-xs text-red-500 mt-1">Chưa có loại phòng nào!</p>}
              </div>

              {/* Nút bấm */}
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Hủy</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;