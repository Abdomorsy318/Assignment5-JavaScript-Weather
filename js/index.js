let searche = document.getElementById("search");

let data;

async function weather(location){
    if(location.length >= 3)
    {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=79a0a56bde49445080391002242506&q=${location}&days=3`);
    data = await response.json();
    displayWeather()
    }
}

function displayWeather(){
    try {
    let md = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDayNum = md.getDay();
    let day = days[currentDayNum]
    let numDay = md.getDate()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let month = months[md.getMonth()]
    /* ---------------------------------------- */
    document.getElementById("name-currnt-day").innerHTML = day;
    document.getElementById("name-currnt-month").innerHTML =`${numDay} ${month}` ;
    document.getElementById("locat").innerHTML = `${data.location.name}`
    document.getElementById("today").innerHTML = `
        <h1 class = "me-5">${data.current.temp_c}°C</h1>
        <img src="https:${data.current.condition.icon}" alt=""/>
    `;
    document.getElementById("status-weather").innerHTML = `<span>${data.current.condition.text}</span>`
    /* --------------------------------------------------- */
    if(currentDayNum == 6)
        day = days[0]
    else
        day = days[currentDayNum + 1]
    document.getElementById("name-second-day").innerHTML = day;
    document.getElementById("second-day").innerHTML = 
    `
        <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="" class = "py-4" />
        <h1>${data.forecast.forecastday[1].day.maxtemp_c}°C</h1>
        <span>${data.forecast.forecastday[1].day.mintemp_c}</span>
    `
    document.getElementById("status-second-day").innerHTML = `${data.forecast.forecastday[1].day.condition.text}`
    /* --------------------------------------------- */
    if(currentDayNum == 6)
        day = days[1]
    else if(currentDayNum + 2 > 6)
        day = days[0]
    else
        day = days[currentDayNum + 2]
    document.getElementById("name-third-day").innerHTML = day; 
    document.getElementById("third-day").innerHTML = 
    `
        <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="" class = "py-4" />
        <h1>${data.forecast.forecastday[2].day.maxtemp_c}°C</h1>
        <span>${data.forecast.forecastday[2].day.mintemp_c}</span>
    `
    document.getElementById("status-third-day").innerHTML = `${data.forecast.forecastday[1].day.condition.text}`
    } catch (error) {
        
    }
}

weather("Cairo")

searche.addEventListener("keyup" , function(){
    weather(searche.value)
})
