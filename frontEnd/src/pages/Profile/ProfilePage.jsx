import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import LogoutBtn from "@/components/ui/LogOutBtn";
import { AuthContext } from "@/context/AuthContext";
import Loadingcomp from "@/components/ui/Loadingcomp.jsx";
import AuroraBg from "@/components/ui/AuroraBg";
import Header from "@/components/ui/header/Header";

export default function ProfilePage() {
  const { user, logout,fetchProfile,loading } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    number_phone: "",
  });
  useEffect(() => {
  if (user) {
    setForm({
      name: user.name || "",
      email: user.email || "",
      number_phone: user.number_phone || "",
    });
  }}, [user]);
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Check login + load profile
  
  if (loading) return (
      <Loadingcomp caigi="thông tin người dùng" />
    );;
  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
        if (!token) {
          setMessage("❌ Bạn chưa đăng nhập");
          return;
        }
      await axios.put(
        "http://localhost:5001/api/users/profile",
        {
          name: form.name,
          email: form.email,
          number_phone: form.number_phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchProfile();
      setMessage("✅ Cập nhật thông tin thành công");
    } catch (err) {
      console.error("❌ Lỗi cập nhật", err);
      setMessage("❌ Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  };

  

  

  return (
    <AuroraBg>
      <Header />
      <div className="min-h-screen  p-10">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold mb-6">👤 Trang cá nhân</h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Họ tên
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                name="number_phone"
                value={form.number_phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>

            {message && (
              <p className="text-center text-sm mt-2">{message}</p>
            )}
          </form>

          <div className="mt-6 text-right">
            <LogoutBtn onLogout={logout} />
          </div>
        </div>
      </div>
    </AuroraBg>
  );
}
