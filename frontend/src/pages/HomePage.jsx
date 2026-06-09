import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../lib/api";

export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({ type: "", capacity: "", maxPrice: "", sort: "" });
  const [message, setMessage] = useState("");

  const loadRooms = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        }
      });

      const data = await apiRequest(`/rooms?${params.toString()}`);
      setRooms(data.rooms);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    loadRooms();
  };

  return (
    <>
      <section className="hero">
        <div>
          <h1>Velora Stays</h1>
          <p>Discover polished rooms, compare prices, and reserve your stay with reliable booking protection.</p>
        </div>
      </section>

      <main className="container">
        <form className="filters" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="type">Room Type</label>
            <select
              className="input"
              id="type"
              value={filters.type}
              onChange={(event) => setFilters({ ...filters, type: event.target.value })}
            >
              <option value="">All</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="capacity">Capacity</label>
            <input
              className="input"
              id="capacity"
              min="1"
              type="number"
              value={filters.capacity}
              onChange={(event) => setFilters({ ...filters, capacity: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              className="input"
              id="maxPrice"
              min="0"
              type="number"
              value={filters.maxPrice}
              onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="sort">Sort</label>
            <select
              className="input"
              id="sort"
              value={filters.sort}
              onChange={(event) => setFilters({ ...filters, sort: event.target.value })}
            >
              <option value="">Newest</option>
              <option value="price">Price Low to High</option>
            </select>
          </div>
          <button className="button" type="submit">
            Search
          </button>
        </form>

        {message ? <div className="alert">{message}</div> : null}

        <section className="grid">
          {rooms.map((room) => (
            <article className="card" key={room._id}>
              <img className="room-image" src={room.imageUrl} alt={room.roomType} />
              <div className="card-body">
                <h2>{room.roomType} Room</h2>
                <div className="meta">Room {room.roomNumber} - Capacity {room.capacity}</div>
                <div className="price">Rs. {room.pricePerNight}/night</div>
                <p className="meta">{room.description}</p>
                <Link className="button" to={`/rooms/${room._id}`}>
                  Book Now
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
