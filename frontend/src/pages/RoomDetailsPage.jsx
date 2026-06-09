import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest, getToken } from "../lib/api";

export default function RoomDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({ checkInDate: "", checkOutDate: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const data = await apiRequest(`/rooms/${id}`);
        setRoom(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadRoom();
  }, [id]);

  const handleBooking = async (event) => {
    event.preventDefault();
    setMessage("");
    setSuccess("");

    if (!getToken()) {
      navigate("/login");
      return;
    }

    try {
      await apiRequest("/bookings", {
        method: "POST",
        body: JSON.stringify({
          roomId: id,
          ...form
        })
      });
      setSuccess("Booking confirmed successfully.");
      setForm({ checkInDate: "", checkOutDate: "" });
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!room) {
    return <main className="container">{message || "Loading room..."}</main>;
  }

  return (
    <main className="container">
      <section className="details-layout">
        <div>
          <img className="room-image card" src={room.imageUrl} alt={room.roomType} />
          <h1>{room.roomType} Room</h1>
          <p className="meta">Room {room.roomNumber} · Capacity {room.capacity}</p>
          <p>{room.description}</p>
          <div className="price">Rs. {room.pricePerNight}/night</div>
        </div>

        <aside className="panel">
          <h2>Book This Room</h2>
          <form className="form" onSubmit={handleBooking}>
            {message ? <div className="alert">{message}</div> : null}
            {success ? <div className="alert success">{success}</div> : null}
            <div className="field">
              <label htmlFor="checkInDate">Check-in Date</label>
              <input
                className="input"
                id="checkInDate"
                required
                type="date"
                value={form.checkInDate}
                onChange={(event) => setForm({ ...form, checkInDate: event.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="checkOutDate">Check-out Date</label>
              <input
                className="input"
                id="checkOutDate"
                required
                type="date"
                value={form.checkOutDate}
                onChange={(event) => setForm({ ...form, checkOutDate: event.target.value })}
              />
            </div>
            <button className="button" type="submit">
              Confirm Booking
            </button>
          </form>
        </aside>
      </section>
    </main>
  );
}

