import React from "react";
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmployeeList from "./pages/EmployeeList";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeeDetails from "./pages/EmployeeDetails";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/employees"
            element={
              <RequireAuth>
                <EmployeeList />
              </RequireAuth>
            }
          />

          <Route
            path="/employees/add"
            element={
              <RequireAuth>
                <EmployeeForm mode="add" />
              </RequireAuth>
            }
          />

          <Route
            path="/employees/edit/:id"
            element={
              <RequireAuth>
                <EmployeeForm mode="edit" />
              </RequireAuth>
            }
          />

          <Route
            path="/employees/:id"
            element={
              <RequireAuth>
                <EmployeeDetails />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
