import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

export default function EmployeeList() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await api.get("/emp/employees");
      return res.data;
    }
  });

  const deleteEmp = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await api.delete("/emp/employees", { params: { eid: id } });
    qc.invalidateQueries(["employees"]);
  };

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-3">Error loading employees</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employees</h2>
        <Link to="/employees/add" className="btn btn-primary">Add Employee</Link>
      </div>

      {/* Search Bar */}
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          placeholder="Department"
          className="form-control"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          className="form-control"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button 
          className="btn btn-secondary"
          onClick={() => qc.invalidateQueries(["employees", department, position])}
        >
          Search
        </button>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">No employees</td>
            </tr>
          )}
          {data && data.map(emp => (
            <tr key={emp._id}>
              <td>{emp.first_name} {emp.last_name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>
                <button className="btn btn-info btn-sm me-1" onClick={() => navigate(`/employees/${emp._id}`)}>View</button>
                <button className="btn btn-warning btn-sm me-1" onClick={() => navigate(`/employees/edit/${emp._id}`)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteEmp(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
