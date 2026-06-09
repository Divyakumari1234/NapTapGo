import { Link, useNavigate } from "react-router-dom";
import { clearSession, getUser } from "../lib/api";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const logout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <Link to="/" className="brand">
        Velora Stays
      </Link>
      <div className="nav-links">
        <Link to="/">Rooms</Link>
        {user ? (
          <>
            <Link to="/my-bookings">My Bookings</Link>
            <button className="link-button" onClick={logout} type="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
