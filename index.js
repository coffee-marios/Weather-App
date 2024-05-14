const myTemperature = document.getElementById("myTemperature");
const degrees_char = myTemperature.textContent;
const myLocation = document.getElementById("myLocation");
const myCondition = document.getElementById("myCondition");
const iconWeather = document.getElementById("icon-weather");

//

const myTemperature_tom = document.getElementById("myTemperature_tom");
const iconWeather_tom = document.getElementById("icon-weather_tom");
const myCondition_tom = document.getElementById("myCondition_tom");

//

const city = document.getElementById("query");

city.addEventListener("keydown", () => {
  if (event.keyCode === 13) {
    const new_city = city.value;
    try {
      get_weather_today(new_city);
      get_weather_tomorrow(new_city);
    } catch (error) {
      console.log(error);
    }
  }
});

async function get_weather_today(city = "London") {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=3e09bdd8cabd408d9ec63431240805&q=${city}&aqi=no`,
      {
        mode: "cors",
      }
    );

    const data_weather = await response.json();
    // console.log(data_weather.current.temp_c);
    const temperature_celsius = data_weather.current.temp_c;
    iconWeather.src = data_weather.current.condition.icon;
    myCondition.textContent = data_weather.current.condition.text;
    myTemperature.textContent = temperature_celsius + degrees_char + " C";
    myLocation.textContent = data_weather.location.name;
  } catch (error) {
    console.log(error);
  }
}

async function get_weather_tomorrow(city = "London") {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=3e09bdd8cabd408d9ec63431240805&q=${city}&days=1&aqi=no&alerts=no
      `
    );
    const data_weather_tom = await response.json();
    console.log(data_weather_tom);
    const tomorrow_forecast = data_weather_tom.forecast.forecastday[0].day;

    iconWeather_tom.src = tomorrow_forecast.condition.icon;
    myTemperature_tom.textContent =
      tomorrow_forecast.avgtemp_c + degrees_char + " C";
    myCondition_tom.textContent = tomorrow_forecast.condition.text;
  } catch (error) {
    console.log(error);
  }
}

get_weather_today();
get_weather_tomorrow();
