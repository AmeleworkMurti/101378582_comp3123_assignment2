import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EmployeeForm({ mode = "add" }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: ""
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "edit" && id) {
      api.get(`/emp/employees/${id}`).then(res => {
        const d = res.data;
        setForm({
          first_name: d.first_name || "",
          last_name: d.last_name || "",
          email: d.email || "",
          position: d.position || "",
          salary: d.salary || "",
          date_of_joining: d.date_of_joining ? d.date_of_joining.split("T")[0] : "",
          department: d.department || ""
        });
      }).catch(() => {});
    }
  }, [mode, id]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // minimal validation
    if (!form.first_name || !form.last_name || !form.email) {
      setError("first name, last name and email required");
      return;
    }

    // Use FormData to allow file upload
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    if (file) data.append("profile_picture", file);

    try {
      if (mode === "add") {
        await api.post("/emp/employees", data, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await api.put(`/emp/employees/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
      }
      navigate("/employees");
    } catch (err) {
      setError(err?.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="card">
      <h2>{mode === "add" ? "Add Employee" : "Update Employee"}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={submit} encType="multipart/form-data">
        <label>First name</label>
        <input name="first_name" value={form.first_name} onChange={onChange} />

        <label>Last name</label>
        <input name="last_name" value={form.last_name} onChange={onChange} />

        <label>Email</label>
        <input name="email" value={form.email} onChange={onChange} />

        <label>Position</label>
        <input name="position" value={form.position} onChange={onChange} />

        <label>Salary</label>
        <input name="salary" value={form.salary} onChange={onChange} />

        <label>Date of joining</label>
        <input type="date" name="date_of_joining" value={form.date_of_joining} onChange={onChange} />

        <label>Department</label>
        <input name="department" value={form.department} onChange={onChange} />

        <label>Profile picture (optional)</label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit">{mode === "add" ? "Add" : "Save"}</button>
      </form>
    </div>
  );
}
