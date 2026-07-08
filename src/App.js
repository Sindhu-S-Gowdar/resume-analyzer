import React, { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:3001/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ resume, jobDescription })
    });

    const data = await response.json();
    console.log(data);
        
  };

  return (
    <div className="App">
      <h1>Resume Analyzer</h1>

      <textarea
        placeholder="Paste your resume text here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        rows={10}
        cols={50}
      ></textarea>

      <textarea
        placeholder="Paste your job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={10}
        cols={50}
      ></textarea>

      <button onClick={handleSubmit}>Analyze</button>
    </div>
  );
}

export default App;
