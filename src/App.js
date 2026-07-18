import React, { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");

    const response = await fetch("http://localhost:3001/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resume, jobDescription }),
    });

    const data = await response.json();
    const text = data.choices[0].message.content;
    setResult(text);
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Resume Analyzer</h1>
        <p>
          Paste your resume and a job description to get instant AI feedback
        </p>
      </div>

      <div className="input-section">
        <div className="input-box">
          <label>Your Resume</label>
          <textarea
            placeholder="Paste your resume text here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          ></textarea>
        </div>

        <div className="input-box">
          <label>Job Description</label>
          <textarea
            placeholder="Paste your job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      <button className="analyze-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze My Resume"}
      </button>

      {result && (
        <div className="result-section">
          <h2>Analysis Result: </h2>
          <p className="result-text">{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
