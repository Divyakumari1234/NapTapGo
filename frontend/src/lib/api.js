const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("hotel_token");
};

export const setSession = ({ token, user }) => {
  localStorage.setItem("hotel_token", token);
  localStorage.setItem("hotel_user", JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem("hotel_token");
  localStorage.removeItem("hotel_user");
};

export const getUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = localStorage.getItem("hotel_user");
  return rawUser ? JSON.parse(rawUser) : null;
};

export const apiRequest = async (path, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};
