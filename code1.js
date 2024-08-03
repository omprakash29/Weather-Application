const apiKey = '33e3b60943b6e980ca0673df92bb9677';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-Btn');
const weatherIcon = document.querySelector('.weather-icon');
const weatherData = document.querySelector('.weather-data');
const errorBox = document.querySelector('.error-message');
const humidityValue = document.querySelector('.humidity-value');
const windValue = document.querySelector('.wind-value');
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');

const checkWeather = async (city) => {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await response.json();

        if(response.status === 404) {
            errorBox.style.display = 'block';
            weatherData.style.display = 'none';
        } else {
            cityName.innerHTML = data.name;
            temperature.innerHTML = `${Math.round(data.main.temp)}℃`;
            humidityValue.innerHTML = `${data.main.humidity}%`;
            windValue.innerHTML = `${data.wind.speed}km/h`;

            switch (data.weather[0].main) {
                case "Clouds" :
                    weatherIcon.src = "images1/clouds.png";
                    break;
                case "Rain" :
                    weatherIcon.src = "images1/rain.png";
                    break;
                case "Clear" :
                    weatherIcon.src = "images1/clear.png";
                    break;
                case "Dizzle" :
                    weatherIcon.src = "images1/dizzle.png"
                    break;
                case "Mist" :
                    weatherIcon.src = "images1/mist.png";
                    break;
                case "Snow" :
                    weatherIcon.src = "images1/snow.png";
                    break;
            }

            weatherData.style.display = "block";
            errorBox.style.display = "none";
        }
    } catch (error) {
        console.log(error);
        errorBox.style.display = "block";
        weatherData.style.display = "none";
    }
};

searchBtn.addEventListener("click", () => checkWeather(searchInput.value));

// This Function is for when you hit ennter button on your keyboard then location will be search    
document.addEventListener("keydown", (event) => {
    if(event.key === 'Enter') {
        searchBtn.click();
    }
})