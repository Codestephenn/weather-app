class WeatherApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
    this.searchBox = document.querySelector(".search input");
    this.searchBtn = document.querySelector(".search button");
    this.weatherIcon = document.querySelector(".weather-icon");

    this.initialize();
  }

  initialize() {
    this.searchBtn.addEventListener("click", () => {
      this.checkWeather(this.searchBox.value);
    });

    // Check if the user supports geolocation and fetch the weather based on user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          this.checkWeatherByCoordinates(latitude, longitude);
        },
        error => {
          console.error("Geolocation error: ", error);
          // You might want to handle errors here, for example, by setting a default city
          this.checkWeather("Lagos"); // Default city
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      this.checkWeather("London"); // Default city
    }
  }

  async checkWeather(city) {
    const response = await fetch(this.apiUrl + `&q=${city}&appid=${this.apiKey}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      let data = await response.json();

      console.log(data);

      // Update the DOM elements with the fetched data
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
      document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
      document.querySelector(".wind").innerHTML = data.wind.speed + ' km/h';
      
      this.updateWeatherIcon(data.weather[0].main);
    }
  }

  async checkWeatherByCoordinates(lat, lon) {
    const response = await fetch(this.apiUrl + `&lat=${lat}&lon=${lon}&appid=${this.apiKey}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      let data = await response.json();

      console.log(data);

      // Update the DOM elements with the fetched data
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
      document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
      document.querySelector(".wind").innerHTML = data.wind.speed + ' km/h';
      
      this.updateWeatherIcon(data.weather[0].main);
    }
  }

  updateWeatherIcon(weather) {
    if (weather === "Clouds") {
      this.weatherIcon.src = "images/clouds.png";
    } else if (weather === "Clear") {
      this.weatherIcon.src = "images/clear.png";
    } else if (weather === "Rain") {
      this.weatherIcon.src = "images/rain.png";
    } else if (weather === "Drizzle") {
      this.weatherIcon.src = "images/drizzle.png";
    } else if (weather === "Mist") {
      this.weatherIcon.src = "images/mist.png";
    }
  }
}

const app = new WeatherApp("ce1aa4dab9c1afc5da4594938eab9313");