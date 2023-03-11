import React, { useState, useEffect } from "react";
import AuthScreen from "./components/AuthScreen";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedData = localStorage.getItem("studentData");
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
    if (storedData) {
      setStudentData(JSON.parse(storedData));
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === "example@email.com" && password === "password123") {
      const token = Math.random().toString(36).substring(2);
      setToken(token);
      localStorage.setItem("token", token);
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setToken(null);
    setStudentData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("studentData");
  };

  const handleImport = (file) => {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (event) => {
      const csv = event.target.result;
      const lines = csv.split(/\r\n|\n/);
      const headers = lines[0].split(",");
      const jsonData = [];
      for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(",");
        if (data.length === headers.length) {
          const student = {};
          for (let j = 0; j < headers.length; j++) {
            student[headers[j]] = data[j];
          }
          jsonData.push(student);
        }
      }
      setStudentData(jsonData);
      localStorage.setItem("studentData", JSON.stringify(jsonData));
    };
  };

  const handleExport = () => {
    const jsonData = JSON.stringify(studentData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "studentData.json";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {loggedIn ? (
        <Dashboard
          handleLogout={handleLogout}
          studentData={studentData}
          handleImport={handleImport}
          handleExport={handleExport}
        />
      ) : (
        <AuthScreen handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
