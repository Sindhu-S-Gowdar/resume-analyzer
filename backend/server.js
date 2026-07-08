const express = require('express');
const cors = require('cors');
//require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/analyze', async(req, res)=>{
    console.log('Key being used:', process.env.GEMINI_API_KEY);
    try {
        const{ resume, jobDescription } = req.body;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AQ.Ab8RN6J0byokWpOp9CN5fkydfvLKjDUYVs39uwhyHZ4nLep2_Q`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Here is a resume:\n${resume}\n\nHere is a job description:\n${jobDescription}\n\nAnalyze how well this resume matches the job. Give a match score out of 10 and list 3 specific improvements.`
          }]
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







