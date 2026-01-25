

const LogoutBtn = ({ onLogout }) => {
  

  const handleLogout = () => {
    // 1. Xóa dữ liệu trình duyệt
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // 2. Gọi hàm callback để cập nhật State ở Header
    if (onLogout) onLogout();
    
    // 3. Chuyển hướng

  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:underline"
    >
      Đăng xuất
    </button>
  );
};

export default LogoutBtn;