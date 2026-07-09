const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/analyze', async(req, res)=>{
    console.log('Key being used:', process.env.GEMINI_API_KEY);
    try {
        const{ resume, jobDescription } = req.body;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{
          role: 'user',
          content: `You are a resume coach giving direct feedback to the candidate. Address them directly using "you" and "your". Here is the resume:\n${resume}\n\nHere is a job description:\n${jobDescription}\n\nAnalyze how well this resume matches the job. Give a match score out of 10 and list 3 specific improvements. Speak directly to the candidate.`
          }]
        })
    });

    const data = await response.json();
    res.json(data);
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
    
});

app.listen(3001, ()=> console.log('Backend running on port 3001'));
console.log('Groq key:', process.env.GROQ_API_KEY);







