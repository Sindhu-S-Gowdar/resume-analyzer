import React, { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:3001/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ resume, jobDescription })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;
    setResult(text);
        
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
      {result && (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'left', whiteSpace: 'pre-wrap'}}>
          <h2>Analysis Result: </h2>
          <p>{result}</p>
          </div>
      )}
    </div>
  );
}

export default App;
