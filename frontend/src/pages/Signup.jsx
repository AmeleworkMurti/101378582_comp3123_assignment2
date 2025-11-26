import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    try {
      await api.post("/user/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="card">
      <h2>Signup</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit}>
        <label>Username</label>
        <input name="username" value={form.username} onChange={onChange} />
        <label>Email</label>
        <input name="email" value={form.email} onChange={onChange} />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={onChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
