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
    let day = md.toLocaleDateString("en-US" , {weekday :"long"})
    let month = md.toLocaleDateString("en-US" , {month :"short"})
    let numDay = md.getDate()
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
    let forcatedate = data.forecast.forecastday
    let next = new Date(forcatedate[1].date)
    day = next.toLocaleDateString("en-US" , {weekday :"long"}) 
    document.getElementById("name-second-day").innerHTML = day;
    document.getElementById("second-day").innerHTML = 
    `
        <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="" class = "py-4" />
        <h1>${data.forecast.forecastday[1].day.maxtemp_c}°C</h1>
        <span>${data.forecast.forecastday[1].day.mintemp_c}</span>
    `
    document.getElementById("status-second-day").innerHTML = `${data.forecast.forecastday[1].day.condition.text}`
    /* --------------------------------------------- */
    next = new Date(forcatedate[2].date)
    day = next.toLocaleDateString("en-US" , {weekday :"long"})
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
