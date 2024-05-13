const myTemperature = document.getElementById("myTemperature");
const degrees_char = myTemperature.textContent;
const myLocation = document.getElementById("myLocation");
const myCondition = document.getElementById("myCondition");
const iconWeather = document.getElementById("icon-weather");

async function get_weather() {
  try {
    const response = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=3e09bdd8cabd408d9ec63431240805&q=London&aqi=no",
      {
        mode: "cors",
      }
    );
    const data_location = await response.json();
    console.log(data_location.current.temp_c);
    const temperature_celsius = data_location.current.temp_c;
    iconWeather.src = data_location.current.condition.icon;
    myCondition.textContent = data_location.current.condition.text;
    myTemperature.innerHTML =
      `Temperature (Celsius): ${temperature_celsius}` + degrees_char;
    myLocation.textContent = data_location.location.name;
  } catch (error) {
    console.log(error);
  }
}

get_weather();
