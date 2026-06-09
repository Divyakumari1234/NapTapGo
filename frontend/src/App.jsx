import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MyBookingsPage from "./pages/MyBookingsPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RoomDetailsPage from "./pages/RoomDetailsPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rooms/:id" element={<RoomDetailsPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Routes>
    </div>
  );
}

