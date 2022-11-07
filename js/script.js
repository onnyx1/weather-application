const main = document.querySelector("main");

const searchBar = document.querySelector(".header__search");
const searchButton = document.querySelector(".header__searchButton");

const cityHeader = document.getElementById("1");
const condition = document.getElementById("2");
const temperature = document.getElementById("3");
const low = document.getElementById("4");
const image = document.getElementById("image");


searchButton.addEventListener("click", () => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&APPID=c31a4ec530e3f92cc56e0267f1d0a374&units=imperial`)
    .then(response => response.json())
    .then(dataObject => {
        // main.textContent =  dataObject.weather[0].description;
        console.log(dataObject);
        cityHeader.textContent = dataObject.name;
        condition.textContent = dataObject.weather[0].main;
        image.src = `http://openweathermap.org/img/wn/${dataObject.weather[0].icon}@2x.png`;
        temperature.textContent = dataObject.main.temp;
        low.textContent = dataObject.main.temp_min + " " + dataObject.main.temp_max;
    })
  
    
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=London&APPID=0d5f22678e05d6d4aad7d8ee355979cf&units=imperial`)
    .then(response => response.json())
    .then(dataObject => {
        // main.textContent =  dataObject.weather[0].description;
        console.log(dataObject);
        console.log(new Date(dataObject.list[0].dt * 1000));

    })
  


})


















