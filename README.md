# Velora Stays - Mini Hotel Booking System

A professional MERN hotel booking assignment with separate backend and React frontend apps.

## Features

- JWT based register and login
- Room listing, details, filters, pagination, and sorting
- Booking creation with overlap conflict protection
- My bookings page
- Booking cancellation with owner validation
- Dashboard API using MongoDB aggregation
- Seed data for demo rooms
- Postman collection included

## Project Structure

```text
mini-hotel-booking-system/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      seed/
      utils/
    .env.example
    package.json
  frontend/
    src/
      components/
      lib/
      pages/
    .env.example
    package.json
  postman/
    Mini-Hotel-Booking-System.postman_collection.json
```

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

Backend runs on `http://localhost:5000`.

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

React frontend runs on `http://localhost:3000`.

## Demo Flow

1. Seed rooms with `npm run seed` inside `backend`.
2. Register a new user from `/register`.
3. Login from `/login`.
4. Browse rooms on `/`.
5. Open a room and create a booking.
6. View or cancel bookings from `/my-bookings`.

## Environment Variables

All sensitive values are stored in `.env` files. Never commit real secrets.

Backend:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mini_hotel_booking
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Rooms

- `GET /api/rooms`
- `GET /api/rooms/:id`
- `GET /api/rooms?type=Deluxe`
- `GET /api/rooms?capacity=2`
- `GET /api/rooms?maxPrice=3000`
- `GET /api/rooms?page=1&limit=10`
- `GET /api/rooms?sort=price`

### Bookings

- `POST /api/bookings`
- `GET /api/bookings/my`
- `PATCH /api/bookings/:id/cancel`

### Dashboard

- `GET /api/dashboard`

## Submission Checklist

- GitHub Repository
- README with setup instructions
- Postman Collection
- `.env.example`
- Sample seed data
