import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/components/Dashboard"
import Login from "@/components/Login"

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  }

  return (
    <>
      <Router>
        <Routes>
          {!userRole ? (
            <Route path="/" element={<Login onLogin={handleLogin} />} /> ) : (
            <Route path="/" element={<Dashboard userRole={userRole} />} />
            )}
        </Routes>
      </Router>
    </>
  )
}

export default App
