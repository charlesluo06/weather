//declare variables
const searchBar = document.getElementById("searchBar");
const widget = document.querySelector(".widget");


//fetches from API
async function getWeather(city) {
    const APIKey = "eae3caacd0bdb2a0f16887bafc30d609";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`

    const response = await fetch(url);
    const data = await response.json();

    updateUI(data);
};


// updates frontend
function updateUI(data) {
    let type = document.querySelector("#type");
    let emoji = document.querySelector("#emoji")

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°";
    type.textContent = data.weather[0].main;
    document.querySelector("#low").textContent = "Low: " + Math.round(data.main.temp_min) + "°";
    document.querySelector("#high").textContent = "High: " + Math.round(data.main.temp_max) + "°";

    if (data.weather[0].main === "Clouds") {
        emoji.src = "cloudy.png";
    }


    if (data.weather[0].main === "Clear") {
        emoji.src = "sun.png";
        type.textContent = "Sunny";
        widget.style.background = "linear-gradient(135deg, #ffe259, #ffa751)";
    }


    if (data.weather[0].main === "Rain") {
        type.textContent = "Raining";
        emoji.src = "rain.png";
    }

}

// listens for enter input
searchBar.addEventListener("keyup", function(e) {
    if (e.key === "Enter"){
        getWeather(searchBar.value);
    }
});

// load riv off rip
window.onload = function () {
    getWeather("Riverside");
}