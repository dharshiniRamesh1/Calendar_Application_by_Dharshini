import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import CompanyList from "./components/CompanyList";
import CommunicationMethodList from "./components/CommunicationMethodList";
import Reports from "./components/Reports";
import Home from "./components/Home";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/companies" className={({ isActive }) => (isActive ? "active" : "")}>
            Companies
          </NavLink>
          <NavLink to="/methods" className={({ isActive }) => (isActive ? "active" : "")}>
            Communication Methods
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => (isActive ? "active" : "")}>
            Reports
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/methods" element={<CommunicationMethodList />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
