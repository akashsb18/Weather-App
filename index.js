

let weather = {
    "apiKey": "0bfd89f4982a2d416a4ac5d299d03f9e",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey + "&units=metric")
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        // .then((data) => console.log(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { temp, temp_min, temp_max } = data.main;
        const { icon } = data.weather[0];
        // console.log(main);
        // console.log(country);
        document.querySelector(".city").innerText = name;
        document.querySelector(".country").innerText = country;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".min").innerText = "Min temp " + temp_min + "°C";
        document.querySelector(".max").innerText = "Max temp " + temp_max + "°C";
        document.querySelector(".weathericon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".Search button").addEventListener("click", function () {
    weather.search();
})

document.querySelector('.search-bar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        weather.search();
    }
});


weather.fetchWeather("kolkata");