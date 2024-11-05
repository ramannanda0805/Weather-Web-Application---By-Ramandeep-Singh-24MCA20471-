async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('weatherResult').innerText = data.error;
        } else {
            const { main, name, weather } = data;
            const weatherInfo = `
                City: ${name} 
                Temperature: ${main.temp} °C
                Condition: ${weather[0].description}
            `;
            document.getElementById('weatherResult').innerText = weatherInfo;
        }
    } catch (error) {
        document.getElementById('weatherResult').innerText = 'Error retrieving weather data';
    }
}
