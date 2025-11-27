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

  // Load existing employee if editing
  useEffect(() => {
    if (mode === "edit" && id) {
      api
        .get(`/emp/employees/${id}`)
        .then((res) => {
          const d = res.data;
          setForm({
            first_name: d.first_name || "",
            last_name: d.last_name || "",
            email: d.email || "",
            position: d.position || "",
            salary: d.salary || "",
            date_of_joining: d.date_of_joining
              ? d.date_of_joining.split("T")[0]
              : "",
            department: d.department || "",
          });
        })
        .catch(() => setError("Failed to load employee"));
    }
  }, [mode, id]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

const submit = async (e) => {
  e.preventDefault();
  setError("");

  if (!form.first_name || !form.last_name || !form.email) {
    setError("first name, last name and email required");
    return;
  }

  try {
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== undefined && form[key] !== null) {
        data.append(key, form[key]);
      }
    });

    if (file) data.append("profile_picture", file);

    if (mode === "edit") {
      await api.put(`/emp/employees/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" } // optional: Axios can auto-set
      });
    } else {
      await api.post("/emp/employees", data, {
        headers: { "Content-Type": "multipart/form-data" } // optional for my sanity check
      });
    }

    alert(`${mode === "edit" ? "UPDATE" : "ADD"} SUCCESS`);
    navigate("/employees");
  } catch (err) {
    console.error("Submit error:", err.response || err);
    setError(err?.response?.data?.message || "Save failed");
  }
};



  return (
    <div className="card p-3 m-3">
      <h2>{mode === "add" ? "Add Employee" : "Update Employee"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={submit} encType="multipart/form-data">
        <div className="mb-2">
          <label>First Name</label>
          <input
            name="first_name"
            value={form.first_name}
            onChange={onChange}
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Last Name</label>
          <input
            name="last_name"
            value={form.last_name}
            onChange={onChange}
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            type="email"
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Position</label>
          <input
            name="position"
            value={form.position}
            onChange={onChange}
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Salary</label>
          <input
            name="salary"
            value={form.salary}
            onChange={onChange}
            type="number"
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Date of Joining</label>
          <input
            name="date_of_joining"
            value={form.date_of_joining}
            onChange={onChange}
            type="date"
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Department</label>
          <input
            name="department"
            value={form.department}
            onChange={onChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Profile Picture (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success">
          {mode === "add" ? "Add Employee" : "Save Changes"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
