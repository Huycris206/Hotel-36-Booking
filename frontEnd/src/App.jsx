import React from 'react';
import { Toaster, toast } from 'sonner';  
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home/HomePage.jsx';
import NotFound from './pages/NotFound/NotFoundPage.jsx';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

