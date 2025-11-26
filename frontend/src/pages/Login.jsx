import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.password || (!form.username && !form.email)) {
      setError("Provide username or email and password");
      return;
    }
    try {
      const res = await api.post("/user/login", form);
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/employees");
      } else {
        setError("No token received");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit}>
        <label>Username (or leave blank to use email)</label>
        <input name="username" value={form.username} onChange={onChange} />
        <label>Email (or leave blank to use username)</label>
        <input name="email" value={form.email} onChange={onChange} />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={onChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
