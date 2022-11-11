const main = document.querySelector("main");

const searchBar = document.querySelector(".header__search");
const searchButton = document.querySelector(".header__searchButton");
const tempButton = document.querySelector(".header__tempButton");

const app = {
  currentWeather: null,
  forecastWeather: null,
  hourlyWeather: null,
  imperial: true,

  loadJson(url) {
    document.querySelector(".loader").style.display = "block";
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    });
  },

  init() {
    searchButton.addEventListener("click", app.grabWeather);
    tempButton.addEventListener("click", app.changeUnits);
    searchBar.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
      }
    });
    app
      .loadJson(`https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&APPID=c31a4ec530e3f92cc56e0267f1d0a374&units=imperial`)
      .then((data) => {
        app.currentWeather = data;
        return app.loadJson(`https://api.openweathermap.org/data/2.5/forecast/daily?q=Fairbanks&APPID=0d5f22678e05d6d4aad7d8ee355979cf&units=imperial`);
      })
      .then((data) => {
        app.forecastData = data;
        return app.loadJson(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=Fairbanks&cnt=24&APPID=0d5f22678e05d6d4aad7d8ee355979cf&units=imperial`);
      })
      .then((data) => {
        app.hourlyWeather = data;
        app.showWeather();
      })
      .finally(() => {
        document.querySelector(".loader").style.display = "none";
      })
      .catch(() => alert("Please enter a valid city."));
  },

  grabWeather() {
    if (app.imperial) {
      app
        .loadJson(`https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&APPID=c31a4ec530e3f92cc56e0267f1d0a374&units=imperial`)
        .then((data) => {
          app.currentWeather = data;
          return app.loadJson(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${searchBar.value}&APPID=0d5f22678e05d6d4aad7d8ee355979cf&units=imperial`);
        })
        .then((data) => {
          app.forecastData = data;
          return app.loadJson(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${searchBar.value}&cnt=24&APPID=0d5f22678e05d6d4aad7d8ee355979cf&units=imperial`);
        })

        .then((data) => {
          app.hourlyWeather = data;
          app.showWeather();
        })
        .finally(() => {
          document.querySelector(".loader").style.display = "none";
        })
        .catch(() => alert("Please enter a valid city."));
    } else {
      app
        .loadJson(`https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&APPID=c31a4ec530e3f92cc56e0267f1d0a374&units=metric`)
        .then((data) => {
          app.currentWeather = data;
          return app.loadJson(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${searchBar.value}&APPID=0d5f22678e05d6d4aad7d8ee355979cf&units=metric`);
        })
        .then((data) => {
          app.forecastData = data;
          return app.loadJson(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${searchBar.value}&cnt=24&APPID=0d5f22678e05d6d4aad7d8ee355979cf&units=metric`);
        })
        .then((data) => {
          app.hourlyWeather = data;
          app.showWeather();
        })
        .finally(() => {
          document.querySelector(".loader").style.display = "none";
        })
        .catch(() => alert("Please enter a valid city."));
    }
  },

  showWeather() {

    app.clear();
console.log(this.currentWeather);
    const page = `<article class="article">
    <div class="article__row">
      <article class="title-card-section">
        <article class="title-card">
          <h1 class="title-card__city">${this.currentWeather.name}, ${this.currentWeather.sys.country}</h1>
          <div class="title-card__description">${this.currentWeather.weather[0].main}</div>
          <div class="title-card__temp">${Math.round(this.currentWeather.main.temp)}&#176;</div>
          <div class="title-card__temps"><span>H:<span class = "title-card__max">${Math.round(app.forecastData.list[0].temp.max)}</span>&#176; L:<span class="title-card__min">${Math.round(app.forecastData.list[0].temp.min)}</span>&#176;</div>
        </article>
      </article>

      <section class="hourly-forecast-section">
      </section>
    </div>
    <p class="title-card-summary">Today: ${app.currentWeather.weather[0].description}. The high will be <span class = "title-card-summary__maxTemp">${Math.round(app.forecastData.list[0].temp.max)}</span>°. The low tonight will be  <span class = "title-card-summary__minTemp">${Math.round(app.forecastData.list[0].temp.min)}</span>°.</p>
  </article>

  <section class="description-section">
    <section class="description-section__column">
      <div class="description-card">
        <div class="description-card__title">Sunrise</div>
        <div class="description-card__data">${new Date(app.currentWeather.sys.sunrise * 1000).toLocaleTimeString()}</div>
      </div>
      <div class="description-card">
        <div class="description-card__title">Feels Like</div>
        <div class="description-card__data description-card__data__feelsLike">${Math.round(app.currentWeather.main.feels_like)}&#176;</div>
      </div>
    </section>
    <section class="description-section__column">
      <div class="description-card">
        <div class="description-card__title">Sunset</div>
        <div class="description-card__data">${new Date(app.currentWeather.sys.sunset * 1000).toLocaleTimeString()}</div>
      </div>
      <div class="description-card">
        <div class="description-card__title">Wind Speed</div>
        <div class="description-card__data">${Math.round(app.currentWeather.wind.speed)} mph</div>
      </div>
    </section>
    <section class="description-section__column">
      <div class="description-card">
        <div class="description-card__title">Chance of Rain</div>
        <div class="description-card__data">${Math.round(app.forecastData.list[0].pop * 100)}%</div>
      </div>
      <div class="description-card">
        <div class="description-card__title">Pressure</div>
        <div class="description-card__data">${app.currentWeather.main.pressure} hPa</div>
      </div>
    </section>
    <section class="description-section__column">
      <div class="description-card">
        <div class="description-card__title">Humidity</div>
        <div class="description-card__data">${Math.round(app.forecastData.list[0].humidity)}%</div>
      </div>
      <div class="description-card">
        <div class="description-card__title">Visibility</div>
        <div class="description-card__data">${app.currentWeather.visibility} m</div>
      </div>
    </section>
    <section class="description-section__column">
      <div class="description-card">
        <div class="description-card__title">Latitude</div>
        <div class="description-card__data">${app.currentWeather.coord.lat}&#176;</div>
      </div>
      <div class="description-card">
        <div class="description-card__title">Longitude</div>
        <div class="description-card__data">${app.currentWeather.coord.lon}&#176;</div>
      </div>
    </section>
  </section>

  <section class="table-container">
    <table class="table">
      <tr>
        <th class="table__header">DAY</th>
        <th></th>
        <th class="table__header">CHANCE OF RAIN</th>
        <th class="table__header">HUMIDITY</th>
        <th class="table__header">TEMPERATURE</th>
      </tr>
    </table>
  </section>`;

    main.appendChild(document.createRange().createContextualFragment(page));
    this.showTable();
    this.showHourly();
  },

  clear() {
    main.innerHTML = "";
  },

  showTable() {
    const table = document.querySelector(".table");

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (const dailyData of app.forecastData.list) {
      const row = table.insertRow(-1);
      const c1 = row.insertCell(0);
      const c2 = row.insertCell(1);
      const c3 = row.insertCell(2);
      const c4 = row.insertCell(3);
      const c5 = row.insertCell(4);

      c1.innerText = weekday[new Date(dailyData.dt * 1000).getUTCDay()];
      c2.innerHTML = `<img src="http://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png" alt="" />`;
      c3.innerText = `${Math.round(dailyData.pop * 100)}%`;
      c4.innerText = `${Math.round(dailyData.humidity)}%`;
      c5.innerHTML = `<span class = "space cell_max">${Math.round(dailyData.temp.max)}&#176;</span><span class = "cell_min">${Math.round(dailyData.temp.min)}&#176;</span>`;
    }
  },

  showHourly() {
    const hourlySection = document.querySelector(".hourly-forecast-section");

    let string = "";

    for (const hourlyData of app.hourlyWeather.list) {
      const card = `<section class="hourly-forecast-card">
          <div class="hourly-forecast-card__time">${new Date(hourlyData.dt * 1000).getHours()}</div>
          <div class="hourly-forecast-card__precip">${Math.round(hourlyData.pop * 100)}%</div>
          <img class="hourly-forecast-card__image" src="http://openweathermap.org/img/wn/${hourlyData.weather[0].icon}@2x.png" alt="" />
          <div class="hourly-forecast-card__temp">${Math.round(hourlyData.main.temp)}&#176;</div>
        </section>`;

      string += card;
    }

    hourlySection.appendChild(document.createRange().createContextualFragment(string));
  },

  changeUnits() {
    document.querySelector(".header__tempButton__F").classList.toggle("header__tempButton__F--bold");
    document.querySelector(".header__tempButton__C").classList.toggle("header__tempButton__C--bold");

    if (app.imperial) {
      app.imperial = false;

      const hourlyTemps = document.querySelectorAll(".hourly-forecast-card__temp");

      for (const temp of hourlyTemps) {
        temp.textContent = temp.textContent.replace("°", "");
        temp.textContent = `${Math.round(app.fToC(Number(temp.textContent)) * 10) / 10}°`;
      }

      document.querySelector(".title-card__temp").textContent = document.querySelector(".title-card__temp").textContent.replace("°", "");
      document.querySelector(".title-card__temp").textContent = `${Math.round(app.fToC(Number(document.querySelector(".title-card__temp").textContent)) * 10) / 10}°`;

      document.querySelector(".title-card__max").textContent = `${Math.round(app.fToC(Number(document.querySelector(".title-card__max").textContent)) * 10) / 10}`;
      document.querySelector(".title-card__min").textContent = `${Math.round(app.fToC(Number(document.querySelector(".title-card__min").textContent)) * 10) / 10}`;

      document.querySelector(".title-card-summary__maxTemp").textContent = document.querySelector(".title-card__max").textContent;
      document.querySelector(".title-card-summary__minTemp").textContent = document.querySelector(".title-card__min").textContent;

      document.querySelector(".description-card__data__feelsLike").textContent = document.querySelector(".description-card__data__feelsLike").textContent.replace("°", "");
      document.querySelector(".description-card__data__feelsLike").textContent = `${Math.round(app.fToC(Number(document.querySelector(".description-card__data__feelsLike").textContent)) * 10) / 10}°`;

      for (const cellMaxTemp of document.querySelectorAll(".cell_max")) {
        cellMaxTemp.textContent = cellMaxTemp.textContent.replace("°", "");
        cellMaxTemp.textContent = `${Math.round(app.fToC(Number(cellMaxTemp.textContent)) * 10) / 10}°`;
      }

      for (const cellMinTemp of document.querySelectorAll(".cell_min")) {
        cellMinTemp.textContent = cellMinTemp.textContent.replace("°", "");
        cellMinTemp.textContent = `${Math.round(app.fToC(Number(cellMinTemp.textContent)) * 10) / 10}°`;
      }
    } else {
      app.imperial = true;

      const hourlyTemps = document.querySelectorAll(".hourly-forecast-card__temp");

      for (const temp of hourlyTemps) {
        temp.textContent = temp.textContent.replace("°", "");
        temp.textContent = `${Math.round(app.cToF(Number(temp.textContent)))}°`;
      }

      document.querySelector(".title-card__temp").textContent = document.querySelector(".title-card__temp").textContent.replace("°", "");
      document.querySelector(".title-card__temp").textContent = `${Math.round(app.cToF(Number(document.querySelector(".title-card__temp").textContent)))}°`;

      document.querySelector(".title-card__max").textContent = `${Math.round(app.cToF(Number(document.querySelector(".title-card__max").textContent)))}`;
      document.querySelector(".title-card__min").textContent = `${Math.round(app.cToF(Number(document.querySelector(".title-card__min").textContent)))}`;

      document.querySelector(".title-card-summary__maxTemp").textContent = document.querySelector(".title-card__max").textContent;
      document.querySelector(".title-card-summary__minTemp").textContent = document.querySelector(".title-card__min").textContent;

      document.querySelector(".description-card__data__feelsLike").textContent = document.querySelector(".description-card__data__feelsLike").textContent.replace("°", "");
      document.querySelector(".description-card__data__feelsLike").textContent = `${Math.round(app.cToF(Number(document.querySelector(".description-card__data__feelsLike").textContent)))}°`;

      for (const cellMaxTemp of document.querySelectorAll(".cell_max")) {
        cellMaxTemp.textContent = cellMaxTemp.textContent.replace("°", "");
        cellMaxTemp.textContent = `${Math.round(app.cToF(Number(cellMaxTemp.textContent)))}°`;
      }

      for (const cellMinTemp of document.querySelectorAll(".cell_min")) {
        cellMinTemp.textContent = cellMinTemp.textContent.replace("°", "");
        cellMinTemp.textContent = `${Math.round(app.cToF(Number(cellMinTemp.textContent)))}°`;
      }
    }
  },

  fToC(num) {
    return ((num - 32) * 5) / 9;
  },

  cToF(num) {
    return (num * 9) / 5 + 32;
  },
};

app.init();
