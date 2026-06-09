import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, setSession } from "../lib/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(form)
      });
      setSession(data);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Login</h1>
        <form className="form" onSubmit={handleSubmit}>
          {message ? <div className="alert">{message}</div> : null}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              id="email"
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              className="input"
              id="password"
              required
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </div>
          <button className="button" type="submit">
            Login
          </button>
          <p className="auth-switch">
            <span>New customer?</span>
            <Link to="/register">Create account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
