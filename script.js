const apiKey = "aed8da0580e633efd16d315a0f70d718";
const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
function handleSearch() {
  if (search.value.trim() === "") {
    alert("Enter city name!");
    return;
  }
  getWeather(search.value);
}
search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});
searchBtn.addEventListener("click", handleSearch);
function changeBackground(condition, sunrise, sunset) {
  const now = Date.now() / 1000;
  const body = document.body;
  condition = condition.toLowerCase();
  if (now < sunrise) {
    body.style.background = "linear-gradient(-45deg,#020617,#000)";
  } 
  else if (now < sunrise + 3600) {
    body.style.background = "linear-gradient(-45deg,#fbbf24,#fb923c)";
  } 
  else if (now > sunset - 3600 && now < sunset) {
    body.style.background = "linear-gradient(-45deg,#fb923c,#1e293b)";
  } 
  else if (now > sunset) {
    body.style.background = "linear-gradient(-45deg,#020617,#0f172a)";
  } 
  else {
    body.style.background = "linear-gradient(-45deg,#38bdf8,#0ea5e9)";
  }
  if (condition.includes("rain")) {
    body.style.background = "linear-gradient(-45deg,#1e3a8a,#0f172a)";
  }
  if (condition.includes("cloud")) {
    body.style.background = "linear-gradient(-45deg,#64748b,#1e293b)";
  }
  if (condition.includes("snow")) {
    body.style.background = "linear-gradient(-45deg,#e0f2fe,#7dd3fc)";
  }
}
function createRain() {
  const rain = document.getElementById("rain");
  rain.innerHTML = "";
  for (let i = 0; i < 120; i++) {
    const drop = document.createElement("div");
    drop.className = "drop";
  drop.style.left = Math.random() * 100 + "vw";
    drop.style.height = Math.random() * 20 + 10 + "px";
    drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + "s";
    rain.appendChild(drop);
  }
}
function createSnow() {
  const rain = document.getElementById("rain");
  rain.innerHTML = "";
  for (let i = 0; i < 80; i++) {
    const snow = document.createElement("div");
    snow.className = "snowflake";
    snow.innerText = "❄";
   snow.style.left = Math.random() * 100 + "vw";
    snow.style.animationDuration = (Math.random() * 3 + 2) + "s";
   rain.appendChild(snow);
  }
}
function createWind() {
  const rain = document.getElementById("rain");
  rain.innerHTML = "";
for (let i = 0; i < 40; i++) {
    const line = document.createElement("div");
    line.className = "wind-line";
    line.style.top = Math.random() * 100 + "vh";
    line.style.animationDuration = (Math.random() * 2 + 1) + "s";
    rain.appendChild(line);
  }
}
function lightningEffect() {
  const flash = document.createElement("div");
  flash.className = "lightning";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 300);
}
function setEffect(type) {
  if (type === "rain") createRain();
  else if (type === "snow") createSnow();
  else createWind();
}
async function getWeather(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  const data = await res.json();
  const condition = data.weather[0].main.toLowerCase();
  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText = Math.round(data.main.temp) + "°";
  document.getElementById("condition").innerText = data.weather[0].main;
  document.getElementById("mainIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("feels").innerText = data.main.feels_like;
  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("wind").innerText = data.wind.speed;
  document.getElementById("pressure").innerText = data.main.pressure;
  changeBackground(condition, data.sys.sunrise, data.sys.sunset);
  if (condition.includes("rain")) createRain();
  else if (condition.includes("snow")) createSnow();
  else createWind();
  if (condition.includes("thunder")) {
    setInterval(lightningEffect, 4000);
  }
  const res2 = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
  );
  const forecast = await res2.json();
  showHourly(forecast.list);
  showDays(forecast.list);
  showChart(forecast.list);
}
function showHourly(data) {
  const hourly = document.getElementById("hourly");
  hourly.innerHTML = "";
  const temps = data.slice(0, 8).map(i => i.main.temp);
  const max = Math.max(...temps);
  const min = Math.min(...temps);
  data.slice(0, 8).forEach((item, index) => {
    const temp = item.main.temp;
    const condition = item.weather[0].main;
    const desc = item.weather[0].description;
    const height = ((temp - min) / (max - min)) * 20;
    hourly.innerHTML += `
      <div class="hour" onclick="selectHour(this)">
        <p>${item.dt_txt.split(" ")[1].slice(0,5)}</p>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
        <p>${Math.round(temp)}°</p>
  <div class="mini-graph">
          <div style="height:${height}px;background:#38bdf8;border-radius:5px;"></div>
        </div>
   <div class="hour-desc">
          ${condition} • ${desc}
        </div>
      </div>
    `;
  });
} 
function showDays(data) {
  const container = document.getElementById("forecast");
  container.innerHTML = "";
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  for (let i = 0; i < data.length; i += 8) {
    const d = new Date(data[i].dt_txt);
    container.innerHTML += `
      <div class="day">
        <span>${days[d.getDay()]}</span>
        <img src="https://openweathermap.org/img/wn/${data[i].weather[0].icon}.png">
        <span>${Math.round(data[i].main.temp)}°</span>
      </div>
    `;
  }
}
function selectHour(element) {
  document.querySelectorAll(".hour").forEach(el => {
    el.classList.remove("active");
  });
  element.classList.add("active");
}
let chart;
function showChart(data) {
  const ctx = document.getElementById("tempChart").getContext("2d");
  const labels = data.slice(0, 12).map(i =>
    i.dt_txt.split(" ")[1].slice(0,5)
  );
  const temps = data.slice(0, 12).map(i => i.main.temp);
  const humidity = data.slice(0, 12).map(i => i.main.humidity);
  const predicted = temps.map((t, i) => t + (i * 0.3));
  if (chart) chart.destroy();
  const gradient = ctx.createLinearGradient(0, 0, 0, 350);
  gradient.addColorStop(0, "rgba(56,189,248,0.6)");
  gradient.addColorStop(1, "rgba(56,189,248,0)");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "🌡 Temp",
          data: temps,
          borderColor: "#38bdf8",
          backgroundColor: gradient,
          fill: true,
          tension: 0.4
        },
        {
          label: "💧 Humidity",
          data: humidity,
          borderColor: "#22c55e",
          tension: 0.4
        },
        {
          label: "🎯 Prediction",
          data: predicted,
          borderColor: "#f59e0b",
          borderDash: [5,5],
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          labels: { color: "#fff" }
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "x"
          },
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: "x"
          }
        }
      },
     scales: {
        x: {
          ticks: { color: "#94a3b8" }
        },
        y: {
          ticks: { color: "#94a3b8" }
        }
      }
    }
  });
}
async function showWorldWeather() {
  const cities = ["Delhi","London","Moscow","New York","Tokyo"];
  const container = document.getElementById("worldWeather");
  container.innerHTML = "";
  for (let city of cities) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();
    container.innerHTML += `
      <div class="day">
        <span>${city}</span>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
        <span>${Math.round(data.main.temp)}°</span>
      </div>
    `;
  }
}
setInterval(() => {
  const city = document.getElementById("city").innerText;
  if (city && city !== "--") {
    getWeather(city);
  }
}, 60000); 
getWeather("Mumbai");
showWorldWeather();
setEffect("wind");