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

            createCard(arr);
        })
        .catch((err) => {
            console.log(err);
        });
}

btn.addEventListener("click", getData);

function createCard(arr) {
    result.innerHTML="";
    arr.forEach((item) => {
        let h4 = document.createElement("h4");
        h4.innerText = item;
        result.appendChild(h4);
    });
}