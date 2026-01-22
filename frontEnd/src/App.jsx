import React from 'react';
import { Toaster, toast } from 'sonner';  
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home/HomePage.jsx';
import NotFound from './pages/NotFound/NotFoundPage.jsx';
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ProfilePage from './pages/Profile/ProfilePage.jsx';
import RoomDetailPage from './pages/RoomDetail/RoomDetailPage.jsx';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path='/rooms/:id' element={<RoomDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

