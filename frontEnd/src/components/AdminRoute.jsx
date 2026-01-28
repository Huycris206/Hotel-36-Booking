// client/src/components/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // Nếu không phải admin -> Đá về nhà
  return (user && user.role === "admin") ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;  