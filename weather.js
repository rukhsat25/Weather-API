const time=document.getElementById('time')
const date=document.getElementById('date')
const currentweatherItem=document.getElementById('current-weather-items')
const timezone=document.getElementById('time-zone')
const country=document.getElementById('country')
const weatherforecast=document.getElementById('weather-forecast')
const current_temp=document.getElementById('current-temp')
const city=document.getElementById('city')
const other=document.getElementById('current-weather-items')

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

setInterval(()=>{
    const t=new Date();
    const month=t.getMonth();
    const day=t.getDay();
    const d=t.getDate();
    const hour=t.getHours();
    let hourin12 = hour >12 ?hour%12:hour
    hourin12 = hour<10? '0'+hour:hour
    const ampm= hour>=12 ? 'PM' : 'AM'
    const minutes=t.getMinutes();

    time.innerHTML=hourin12+':'+minutes+' '+`<span id="am-pm">${ampm} </span>`;
    date.innerHTML=days[day]+', '+d+' '+months[month];
});

city.addEventListener("keydown",function(event){
    if (event.key==='Enter'){
        get_today_weather(city.value)
    }
})

function get_today_weather(cityname){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90bcac40bfmsh07feb3c8e3f4d4ap1ce832jsn33b3af5d6c3a',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityname}&days=3`, options)
        .then(response => response.json())
        .then(data => update_today_weather(data))
        .catch(err => console.error(err));
}

function update_today_weather(data){
    other.innerHTML=
    `<div class="weather-item">
        <div>Pressure</div>
        <div>${data.current.pressure_mb} mb </div>
    </div>
    <div class="weather-item">
        <div>Wind</div>
        <div>${data.current.wind_kph} kph</div>
    </div>
    <div class="weather-item">
        <div>Humidity</div>
        <div>${data.current.humidity}</div>
    </div>`
    timezone.innerText=data.location.tz_id
    country.innerText=data.location.country
    update_forecast(data)
}

function update_forecast(data){
    const t=new Date().getDay();
    console.log(data)
    current_temp.innerHTML=
    `<img src=${data.current.condition.icon} alt="weather-icon" class="w-icon">
    <div class="other">
        <div class="day"> ${days[t]}</div>
        <div class="temp">Day - ${data.forecast.forecastday[0].day.maxtemp_c} &#176; C</div>
        <div class="temp">Night - ${data.forecast.forecastday[0].day.mintemp_c} &#176; C</div>
    </div>`
}
