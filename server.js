const express = require('express');
const cors = require('cors');               // Add CORS middleware
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));        // or built-in fetch in newer Node versions

const app = express();
const PORT = 3000;

app.use(cors());           // Enable CORS for all origins (frontend on different port)
app.use(express.json());

// No need to serve static files here if you use Live Server for frontend

app.post('/predict', async (req, res) => {
  try {
    const { pclass, sex, age, sibsp, fare } = req.body;

    const sexNum = sex.toLowerCase() === 'male' ? 1 : 0;
    const family = Number(sibsp);

    const payload = {
      Pclass: Number(pclass),
      Sex: sexNum,
      Age: Number(age),
      Fare: Number(fare),
      Family: family,
      Embarked: 2,
    };

    const response = await fetch('http://127.0.0.1:8000/predict/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Prediction API error' });
    }

    const predictionResult = await response.json();

    res.json({ result: predictionResult });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
