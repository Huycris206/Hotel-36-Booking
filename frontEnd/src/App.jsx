import React from 'react';
import { Toaster } from 'sonner';   
import { Routes, Route } from 'react-router-dom'; // Chỉ import Routes và Route

// --- User Pages ---
import Home from './pages/Home/HomePage.jsx';
import NotFound from './pages/NotFound/NotFoundPage.jsx';
import LoginPage from "./pages/Auth/LogInPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ProfilePage from './pages/Profile/ProfilePage.jsx';
import RoomDetailPage from './pages/RoomDetail/RoomDetailPage.jsx';
import CheckOutPage from './pages/Checkout/CheckOutPage.jsx';

// --- Admin Pages ---
// 👇 Đảm bảo 5 file này phải tồn tại, nếu thiếu 1 cái là lỗi trắng màn hình
import AdminLayout from "./layouts/AdminLayout.jsx"; 
import ManageRooms from "./pages/Admin/ManageRooms";
import ManageUsers from "./pages/Admin/ManageUsers.jsx";
import ManageBookings from "./pages/Admin/ManageBookings";
import AdminRoute from "./components/AdminRoute";
import { Check } from 'lucide-react';
import MyBookingPage from './pages/MyBooking/MyBookingPage.jsx';

const App = () => {
  return (
    <div>
        <Toaster position="top-right" /> 

        <Routes>
          {/* --- USER ROUTES --- */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/rooms/:id' element={<RoomDetailPage />} />
          <Route path='/checkout/:roomId' element={<CheckOutPage />} />
          <Route path='/my-booking' element={<MyBookingPage/>}/>
          {/* --- ADMIN ROUTES --- */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<ManageRooms />} /> 
              <Route path="rooms" element={<ManageRooms />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="bookings" element={<ManageBookings />} />
            </Route>
          </Route>

          {/* --- 404 Page (Để cuối cùng) --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default App;