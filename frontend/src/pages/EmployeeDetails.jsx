import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    api.get(`/emp/employees/${id}`).then(res => setEmp(res.data)).catch(() => {});
  }, [id]);

  if (!emp) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2>{emp.first_name} {emp.last_name}</h2>
      {emp.profile_picture ? (
        <img src={`http://localhost:5000/uploads/${emp.profile_picture}`} alt="profile" style={{maxWidth:200}} />
      ) : null}
      <p><strong>Email</strong>: {emp.email}</p>
      <p><strong>Position</strong>: {emp.position}</p>
      <p><strong>Salary</strong>: {emp.salary}</p>
      <p><strong>Department</strong>: {emp.department}</p>
      <p><strong>Date of joining</strong>: {new Date(emp.date_of_joining).toLocaleDateString()}</p>

      <div>
        <button onClick={() => navigate(`/employees/edit/${emp._id}`)}>Update</button>
        <button onClick={() => navigate("/employees")}>Back</button>
      </div>
    </div>
  );
}
