import React, { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = () => {
    console.log("Resume: ", resume);
    console.log("JD:", jobDescription);
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
