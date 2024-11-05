require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3002;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route to fetch weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.json({ error: "Please provide a city name" });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        res.json(weatherData);
    } catch (error) {
        res.json({ error: "Could not retrieve weather data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
