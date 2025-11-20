//declare variables
const searchBar = document.getElementById("searchBar");
const widget = document.querySelector(".widget");
const container = document.querySelector("#container");


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

    if (data.message === "city not found"){
        type.textContent = "City Not Found."
        emoji.src = "";
        container.style.background = "#880101ff";
        widget.style.background = "linear-gradient(135deg, #f04141ff, #880101ff)";
        document.querySelector(".city").textContent = "City not found.";
        document.querySelector(".temp").textContent = "-67°";
        document.querySelector("#low").textContent = "Low: -67°";
        document.querySelector("#high").textContent = "High: -67°";
        return;
    }

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°";
    type.textContent = data.weather[0].main;
    document.querySelector("#low").textContent = "Low: " + Math.round(data.main.temp_min) + "°";
    document.querySelector("#high").textContent = "High: " + Math.round(data.main.temp_max) + "°";

    if (data.weather[0].main === "Clouds") {
        emoji.src = "cloudy.png";
        type.textContent = "Cloudy";
        widget.style.background = "linear-gradient(135deg, #e0ddddff, #434242ff)";
        container.style.background = "#434242ff";
    }


    if (data.weather[0].main === "Clear") {
        emoji.src = "sun.png";
        type.textContent = "Clear";
        widget.style.background = "linear-gradient(135deg, #f0d134ff, #d26a03ff)";
        container.style.background = "#d26a03ff";
    }


    if (data.weather[0].main === "Rain") {
        type.textContent = "Raining";
        emoji.src = "rain.png";
        widget.style.background = "linear-gradient(135deg, #4181f0ff, #05299dff)";
        container.style.background = "#05299dff";
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