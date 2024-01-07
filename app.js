const wholeModel = document.querySelector(".main");
const results = document.querySelector(".results");
const input = document.querySelector("input");
const checkBtn = document.querySelector("button");
const closeBtn = document.querySelector(".reset-model");
/**
 *
 * @param {Object | Object[]} inputData getting data from the data the user put inside the input field.
 *
 * The function performs a fetch and generates the data inside the app.
 */
const getWeather = async function (inputData) {
  try {
    renderSpinner();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputData}&appid=40af5230b1b9fa8b6a665dc853b4d7d7`
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error("Could not find the location you are searching for");

    setTimeout(() => {
      results.innerHTML = generateHTML(data);
    }, 1000);
  } catch (err) {
    results.innerHTML = `<div class="error-message"><img class="icon-small" src="warning.png" /> ${err.message}.</div>`;
  }
};

// Creates a spinner until fetch is completed and inserted in the HTML
const renderSpinner = function () {
  const html = '<img class="loading" src="loading.png"/>';
  results.innerHTML = '<img class="loading" src="loading.png"/>';
};

/**
 *
 * @param {Object | Object[]} data the data is the same data from the input field
 * @returns {string} HTML that gets custom generated based on the data given in the argument.
 */
const generateHTML = function (data) {
  const temp = Number((data.main.temp - 273.15).toFixed(2));
  const icon = temp > 15 ? "hot.png" : "cold.png";

  return `  
       <div class="overview"><p><img class="icon-medium" src="./weather-conditions-img/${data.weather[0].main}.png"</p>
       <p>
       Mainly ${data.weather[0].main}
       </p>
       </div>
           <div class="temp">
          <img class="icon-image" src="${icon}" />
          <h2 class="temperature">${temp}C°</h2>
        </div>
        <div class="other-info">
          <div class="wind-speed other__info">
            <img class="icon-small" src="./other-info-img/windy.png" />${data.wind.speed}m/s
          </div>

          <div class="clouds other__info">
            <img class="icon-small" src="./other-info-img/cloud.png" />${data.clouds.all}%
          </div>

          <div class="humidity other__info">
            <img class="icon-small" src="./other-info-img/humidity.png" /> ${data.main.humidity}%
          </div>

          <div class="pressure other__info">
            <img class="icon-small" src="./other-info-img/barometer.png" /> ${data.main.pressure}mb
          </div>
        </div>`;
};

// Adding event handlers (Would be easier if i created a label and put the input inside, but i don't know how to do that yet).
wholeModel.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getWeather(input.value);
    wholeModel.style.height = "80rem";
    closeBtn.classList.remove("hidden");
    input.value = "";
    input.setAttribute("placeholder", "Try it again!");
  }
});

checkBtn.addEventListener("click", function () {
  getWeather(input.value);

  wholeModel.style.height = "80rem";
  input.value = "";
  closeBtn.classList.remove("hidden");
  input.setAttribute("placeholder", "Try it again!");
});

closeBtn.addEventListener("click", function () {
  wholeModel.style.height = "10rem";
  results.innerHTML = "";
  closeBtn.classList.add("hidden");
});
