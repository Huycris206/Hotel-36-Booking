import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../components/ui/Input";
import Header from "@/components/ui/header/Header";
import AuroraBg from "@/components/ui/AuroraBg";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    number_phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          number_phone: form.number_phone,
          password: form.password,
        }
      );


      const { token, user } = res.data;
      login(user, token)

      // ✅ LƯU TOKEN + USER
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🔐 CHECK ROLE
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(
        err.response?.data?.message || "Đăng nhập thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <AuroraBg>
        <Header />
        <div className="flex items-center justify-center px-10">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
                <h1 className="text-2xl font-bold text-center text-orange-500">
                    Đăng nhập
                </h1>

                {error && (
                <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
                    {error}
                </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                <Input
                    label="Số điện thoại"
                    name="number_phone"
                    value={form.number_phone}
                    onChange={handleChange}
                    placeholder="9999 999 999"
                    required
                />

                <Input
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="toiyeuditbu"
                    required
                />

                <button
                    disabled={loading}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50"
                >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
                </form>

                <p className="text-sm text-center text-gray-500">
                Chưa có tài khoản?{" "}
                <Link to="/register" className="text-orange-500 hover:underline">
                    Đăng ký
                </Link>
                </p>
            </div>
        </div>
    </AuroraBg>

  );
};

export default LoginPage;
