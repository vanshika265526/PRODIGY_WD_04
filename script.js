const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWheather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.wind.speed + " km/h";

    console.log(data.weather[0].main);
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "img/clouds.svg";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "img/clear.svg";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "img/rain.svg";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "img/drizzle.svg";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "img/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
// Click event for the button
searchBtn.addEventListener("click", () => {
  checkWheather(searchBox.value);
});

// Keydown event for Enter key
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWheather(searchBox.value);
  }
});

checkWheather("New Delhi");