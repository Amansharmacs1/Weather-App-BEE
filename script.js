let data = {};
const btn = document.getElementById("searchbtn");
let result=document.getElementById("result");

function getData() {
    const city = document.getElementById("city");

    if (!city.value.trim()) {
        alert("Enter City Name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=07a85bdf7c3429598c1a2800af38467d&units=metric`)
        .then((res) => res.json())
        .then((res) => {
            data = res;
            let arr = [
                "Temperature: " + data.list[0].main.temp,
                "Feels like: " + data.list[0].main.feels_like,
                "Minimum Temperature: " + data.list[0].main.temp_min,
                "Maximum Temperature: " + data.list[0].main.temp_max,
                "Humidity: " + data.list[0].main.humidity,
                "Pressure: " + data.list[0].main.pressure,
                "Wind Speed: " + data.list[0].wind.speed,
                "Description: " + data.list[0].weather[0].description
            ];

            const weatherCondition = data.list[0].weather[0].main;
            createCard(arr, weatherCondition);
        })
        .catch((err) => {
            console.log(err);
        });
}

btn.addEventListener("click", getData);

function getWeatherIcon(condition) {
    condition = condition.toLowerCase();
    if (condition.includes('clear')) {
        return `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f1c40f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    } else if (condition.includes('cloud')) {
        return `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#bdc3c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`;
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
        return `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path><path d="M16 13v6"></path><path d="M8 13v9"></path><path d="M12 15v9"></path></svg>`;
    } else if (condition.includes('snow')) {
        return `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ecf0f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line></svg>`;
    } else if (condition.includes('thunder')) {
        return `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9b59b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>`;
    } else {
        return `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#95a5a6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`;
    }
}

function createCard(arr, condition){
    const result = document.getElementById("result");
    result.innerHTML = "";
    result.style.display = "block";

    if (condition) {
        const iconDiv = document.createElement("div");
        iconDiv.className = "weather-icon";
        iconDiv.style.textAlign = "center";
        iconDiv.style.marginBottom = "15px";
        iconDiv.innerHTML = getWeatherIcon(condition);
        result.appendChild(iconDiv);
    }

    arr.forEach(item => {
        const h2 = document.createElement("h2");
        h2.innerText = item;
        result.appendChild(h2);
    });
}