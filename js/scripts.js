document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pesquisa').addEventListener('click', function(event) {
        event.preventDefault(); // Evita o envio do formulário

        const localDigitado = document.getElementById('localInput').value;
        const apiKey = 'mKdNipC85Uc1aSVw';

        fetch(`https://api.meteoblue.com/nowcast/point?query=${localDigitado}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.instant && data.data.instant.details) {
                    const temperature = data.data.instant.details.temperature;
                    const weatherDescription = data.data.instant.details.weathercode.value;

                    const weatherInfo = document.querySelector('.weather-info');

                    weatherInfo.innerHTML = `
                        <p>Temperatura: ${temperature}°C</p>
                        <p>Descrição do Tempo: ${weatherDescription}</p>
                    `;
                } else {
                    throw new Error('Dados meteorológicos não encontrados');
                }
            })
            .catch(error => {
                console.error('Erro ao obter dados do clima:', error);
                const weatherInfo = document.querySelector('.weather-info');
                weatherInfo.innerHTML = '<p>Ocorreu um erro ao obter os dados do clima. Por favor, tente novamente mais tarde.</p>';
            });
    });
});
