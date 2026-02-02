import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Input from "../../components/ui/Input";
import AuroraBg from "@/components/ui/AuroraBg";
import Header from "@/components/layout/header/Header";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    number_phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Submit register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("❌ Mật khẩu nhập lại không khớp");
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5001/api/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        number_phone: form.number_phone.trim(),
        password: form.password,
      });

      alert("✅ Đăng ký thành công, vui lòng đăng nhập");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      setError(
        err.response?.data?.message || "❌ Đăng ký thất bại, vui lòng thử lại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuroraBg>
      <Header />
      <div className=" flex items-center justify-center px-10">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-center text-orange-500">
            Đăng ký
          </h1>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Họ và tên"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />

            <Input
              label="Số điện thoại"
              name="number_phone"
              value={form.number_phone}
              onChange={handleChange}
              placeholder="0123456789"
              required
            />

            <Input
              label="Mật khẩu"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <Input
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? "Đang đăng ký..." : "Tạo tài khoản"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </AuroraBg>
  );
};

export default RegisterPage;
