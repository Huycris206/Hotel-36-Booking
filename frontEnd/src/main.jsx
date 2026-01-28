window.addEventListener("unhandledrejection", (event) => {
  console.error("🔥 GLOBAL unhandled rejection:", event.reason);
});

window.addEventListener("error", (event) => {
  console.error("🔥 GLOBAL error:", event.error);
});

const _remove = localStorage.removeItem;
localStorage.removeItem = function(key) {
  console.trace("🔥 localStorage.removeItem called:", key);
  return _remove.apply(this, arguments);
};
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import Loadingcomp from './components/ui/Loadingcomp'
import { BookingProvider } from './context/BookingContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  </StrictMode>,
)
