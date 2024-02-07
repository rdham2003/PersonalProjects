const weatherForm = document.querySelector(".getWeather");
const cityInput = document.querySelector(".weatherData");
const card = document.querySelector(".weatherCard");
const API = "3f465ec287cfeb5fa02a21445f57f65b";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeather(city);
            weatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeather(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
    const response = await fetch(apiURL);
    // console.log(response);
    if (!response.ok){
        throw new Error("Could not fetch weather data")
    }
    return await response.json();
}

function weatherInfo(data){
    console.log(data);
    const name = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const temp_min = data.main.temp_min;
    const temp_max = data.main.temp_max;
    const windSpeed = data.wind.speed;
    const windDirection = data.wind.deg;
    const humidity = data.main.humidity;
    const feelsLike = data.main.feels_like;
    const weather = data.weather[0].main;
    const weatherID = data.weather[0].id;
    // console.log(name,temp, temp_min, temp_max, windSpeed, windDirection, humidity, feelsLike, weather, weatherID, country);
    const cityName = document.querySelector(".weatherCity");
    const cityTemp = document.querySelector(".temperature");
    const cityWeather = document.querySelector(".weatherReport");
    const cityEmoji = document.querySelector(".weatherEmoji");
    const cityFeelsLike = document.querySelector(".feelsLike");
    const cityHumidity = document.querySelector(".humidity");
    const cityWSpeed = document.querySelector(".windSpeed");
    const cityWdir = document.querySelector(".windDirection");
    cityName.textContent = `${name}, ${country}`;
    cityTemp.textContent = `${Math.round(((temp - 273.15) * (9/5) + 32))}° F`;
    cityWeather.textContent = weather;
    if (weatherID >= 200 && weatherID < 300) {
        cityEmoji.textContent = '⛈️';
        card.style.background = "linear-gradient(180deg, rgb(79, 78, 77), rgb(138, 177, 227))";
    } else if (weatherID >= 300 && weatherID < 400) {
        cityEmoji.textContent = '🌧️';
        card.style.background = "linear-gradient(180deg, rgb(79, 78, 77), rgb(138, 177, 227))";
    } else if (weatherID >= 500 && weatherID < 600) {
        cityEmoji.textContent = '🌧️';
        card.style.background = "linear-gradient(180deg, rgb(79, 78, 77), rgb(138, 177, 227))";
    } else if (weatherID >= 600 && weatherID < 700) {
        cityEmoji.textContent = '🌨️';
        card.style.background = "linear-gradient(180deg, rgb(79, 78, 77), rgb(255, 255, 255))";
    } else if (weatherID >= 700 && weatherID < 800) {
        cityEmoji.textContent = '🌫️';
        card.style.background = "linear-gradient(180deg, rgb(79, 78, 77), rgb(153, 152, 148))";
    } else if (weatherID >= 801 && weatherID < 900) {
        cityEmoji.textContent = '☁️';
        card.style.background = "linear-gradient(180deg, rgb(102, 101, 98), rgb(222, 221, 217))";
    } else if (weatherID == 800) {
        cityEmoji.textContent = '☀️';
        card.style.background = "linear-gradient(180deg, rgb(63, 162, 255),rgb(255, 174, 0))";
    }
    else {
        card.style.background = "default-background-style";
    }
    console.log(weatherID)
    cityFeelsLike.textContent = `Feels like: ${Math.round(((feelsLike - 273.15) * (9/5) + 32))}° F`;
    cityHumidity.textContent = `Humidity: ${humidity}%`;
    cityWSpeed.textContent = `Wind Speed: ${windSpeed}mph`;
    if (windDirection > 338 && windDirection <= 23){
        cityWdir.textContent = `Wind Direction: North`;
    }
    else if (windDirection > 23 && windDirection <= 68){
        cityWdir.textContent = `Wind Direction: Northeast`;
    }
    else if (windDirection > 68 && windDirection <= 113){
        cityWdir.textContent = `Wind Direction: East`;
    }
    else if (windDirection > 113 && windDirection <= 158){
        cityWdir.textContent = `Wind Direction: Southeast`;
    }
    else if (windDirection > 158 && windDirection <= 203){
        cityWdir.textContent = `Wind Direction: South`;
    }
    else if (windDirection > 203 && windDirection <= 248){
        cityWdir.textContent = `Wind Direction: Southwest`;
    }
    else if (windDirection > 248 && windDirection <= 293){
        cityWdir.textContent = `Wind Direction: West`;
    }
    else if (windDirection > 293 && windDirection <= 338){
        cityWdir.textContent = `Wind Direction: Northwest`;
    }
    console.log(windDirection);
    document.querySelector(".weatherCard").style.display = "block";
    document.querySelector(".error").style.display = "none";
}


function displayError(message){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weatherCard").style.display = "none";
}