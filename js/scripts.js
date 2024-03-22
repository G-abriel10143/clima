document.getElementById('pesquisa').addEventListener('click', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    var localDigitado = document.getElementById('localInput').value;
    console.log(localDigitado);

    // Sua chave de API
    const apiKey = '9083299295fb46be92b191836242203';
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${localDigitado}&lang=pt&days=1&aqi=no&alerts=no`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Para visualizar os dados retornados no console do navegador
        const weatherInfoDiv = document.getElementById('weatherInfo');
        // Mapeando as fases da lua para português
        const moonPhases = {
          'New Moon': 'Lua Nova',
          'Waxing Crescent': 'Crescente Côncavo',
          'First Quarter': 'Quarto Crescente',
          'Waxing Gibbous': 'Crescente Convexo',
          'Full Moon': 'Lua Cheia',
          'Waning Gibbous': 'Minguante Convexo',
          'Last Quarter': 'Quarto Minguante',
          'Waning Crescent': 'Minguante Côncavo'
        };
        const moonPhaseInPortuguese = moonPhases[data.forecast.forecastday[0].astro.moon_phase];
        // Construindo a string com os dados meteorológicos
        const weatherData = `
          <p>Localização: ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
          <p>Condição do Tempo: ${data.current.condition.text}</p>
          <p>Temperatura: ${data.current.temp_c}°C</p>
          <p>Umidade: ${data.current.humidity}%</p>
          <p>Velocidade do Vento: ${data.current.wind_kph} km/h</p>
          <p>Fase da Lua: ${moonPhaseInPortuguese}</p>
          <h2>Previsão para as próximas 12 horas:</h2>
          <ul>
            ${data.forecast.forecastday[0].hour.slice(0, 12).map(hour => `
              <li>${hour.time}: ${hour.condition.text}, ${hour.temp_c}°C</li>
            `).join('')}
          </ul>
        `;
        // Inserindo os dados na div
        weatherInfoDiv.innerHTML = weatherData;
      })
      .catch(error => {
        console.error('Erro ao obter dados meteorológicos:', error);
      });
});