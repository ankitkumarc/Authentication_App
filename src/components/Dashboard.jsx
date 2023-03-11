import React, { useState } from "react";

const Dashboard = () => {
  const [students, setStudents] = useState([]);

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const csv = reader.result;
      const lines = csv.split("\n");
      const headers = lines[0].split(",");
      const data = lines.slice(1).map((line) => {
        const values = line.split(",");
        return headers.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
      });
      localStorage.setItem("StudentData", JSON.stringify(data));
      setStudents(data);
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const data = localStorage.getItem("StudentData");
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "StudentData.json";
    link.click();
  };

  return (
    <div>
      <div className="navbar">
        <h2>Students</h2>
        <p style={{ opacity: "60%" }}>List of all students in the database</p>
        <input type="file" accept=".csv" onChange={handleImport} />
        <button className="btn" onClick={handleExport}>
          Export as CSV
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Address</th>
            <th>Institute</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.rollno}</td>
              <td>{student.address}</td>
              <td>{student.institute}</td>
              <td>{student.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
