// Weather App

const weahterForm = document.querySelector(".wheatherForm")
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apiKey = "0ff327ab614cc2d493499f9101999b21";

weahterForm.addEventListener("submit", async event => {

    event.preventDefault()
    const city = cityInput.value;

    if (city) {

        try {

            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData)

        } catch (error) {
            console.error(error)
            displayError(error)
        }

    } else {
        displayError("Please Enter City!")
    }

})

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
        throw new Error("Could not fetch weather data.")
    }

    return await response.json();

}

function displayWeatherInfo(data) {

    const { name: city, main: { temp, humidity }, weather: [{ description }] } = data

    card.textContent = "";
    card.style.display = "block"

    const cityDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temprature : ${(temp - 273.15).toFixed(2)}°C`
    humidityDisplay.textContent = `Humidity : ${humidity}%`
    descDisplay.textContent = description
    weatherEmoji.textContent = getWeatherEmoji(temp - 273.15)



    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    descDisplay.classList.add("descDisplay")
    weatherEmoji.classList.add("weatherEmoji")


    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherId) {

    switch (true) {
        case (weatherId >= 45):
            return "🔥";
        case (weatherId >= 35 && weatherId < 45):
            return "☀️";
        case (weatherId >= 25 && weatherId < 35):
            return "🌤️";
        case (weatherId >= 15 && weatherId < 25):
            return "🌥️";
        case (weatherId >= 5 && weatherId < 15):
            return "❄️";
        case (weatherId < 5):
            return "🧊";
        default:
            return "❓ Unknown Temperature";

    }
}

function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";
    card.style.display = "block"
    card.appendChild(errorDisplay);

}