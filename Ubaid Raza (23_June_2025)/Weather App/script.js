const API_KEY = '162472582e29ba39f2b4761f02dc1953'; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById('cityInput').value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById('weatherResult');
      resultDiv.classList.remove('hidden');
      resultDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p><strong>🌡️ Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>☁️ Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>💨 Wind:</strong> ${data.wind.speed} m/s</p>
      `;
    })
    .catch(error => {
      const resultDiv = document.getElementById('weatherResult');
      resultDiv.classList.remove('hidden');
      resultDiv.innerHTML = '<p style="color:red;">City not found. Please try again.</p>';
      console.error('Error:', error);
    });
}