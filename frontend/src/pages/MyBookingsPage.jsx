import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, getToken } from "../lib/api";

const formatDate = (date) => new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(date));

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const loadBookings = async () => {
    if (!getToken()) {
      navigate("/login");
      return;
    }

    try {
      const data = await apiRequest("/bookings/my");
      setBookings(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    try {
      await apiRequest(`/bookings/${id}/cancel`, { method: "PATCH" });
      await loadBookings();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="container">
      <h1>My Bookings</h1>
      {message ? <div className="alert">{message}</div> : null}
      <section className="card">
        {bookings.length === 0 ? (
          <div className="card-body">No bookings found.</div>
        ) : (
          bookings.map((booking) => (
            <div className="booking-row" key={booking._id}>
              <img className="room-image" src={booking.roomId.imageUrl} alt={booking.roomId.roomType} />
              <div>
                <h3>{booking.roomId.roomType} Room</h3>
                <p className="meta">
                  {formatDate(booking.checkInDate)} to {formatDate(booking.checkOutDate)}
                </p>
                <p className="meta">Total Amount: Rs. {booking.totalAmount}</p>
                <span className={`status ${booking.status}`}>{booking.status}</span>
              </div>
              <button
                className="button danger"
                disabled={booking.status === "cancelled"}
                onClick={() => cancelBooking(booking._id)}
                type="button"
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

