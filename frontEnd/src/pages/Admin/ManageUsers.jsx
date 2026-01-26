import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // 1. Lấy danh sách User
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách user:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Xóa User
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa người dùng này?")) {
      try {
        await axios.delete(`http://localhost:5001/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user._id !== id));
        alert("Đã xóa thành công!");
      } catch (err) {
        alert("Lỗi xóa người dùng!");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="p-8 text-center">Đang tải danh sách...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản Lý User</h2>
        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-semibold">
          Tổng: {users.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-600 uppercase text-sm">
              <th className="py-3 px-4">Tên</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">SĐT</th> {/* Thêm cột SĐT */}
              <th className="py-3 px-4">Quyền</th>
              <th className="py-3 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{user.name || user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.number_phone || "---"}</td>
                
                <td className="py-3 px-4">
                  {/* Logic hiển thị quyền mới */}
                  {user.isAdmin || user.role === 'admin' ? (
                    <span className="bg-red-100 text-red-700 py-1 px-3 rounded-full text-xs font-bold border border-red-200">
                      Admin
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold border border-green-200">
                      Member
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs transition shadow"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;