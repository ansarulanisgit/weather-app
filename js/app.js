
const showSpinner = ()=>{
    const spinner = document.getElementById('spinner-area');
    spinner.style.display = 'block';
    const data = document.getElementById('data-area');
    data.style.display = 'none';
}

const hideSpinner = ()=>{
    const spinner = document.getElementById('spinner-area');
    spinner.style.display = 'none';
    const data = document.getElementById('data-area');
    data.style.display = 'block';
}

// Global Variables
const notificaiton = document.getElementById('notifcation');
const dataArea = document.getElementById('data')
const showWeather =()=>{
    showSpinner();
    const searchText = document.getElementById('search-input');
    const searchLowerCase = searchText.value.toLowerCase();    
    searchText.value = '';
    if(searchLowerCase.length <=0){
        dataArea.textContent = '';
        notificaiton.innerHTML = `<p class="text-danger">Please input city name to find weather</p>`;
        notificaiton.style.display= "block";
        hideSpinner();
    }
    else{
        const APIKey = `becf4c77b41405fe323e57c3bde0a830`;
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${searchLowerCase}&units=metric&appid=${APIKey}`;

        fetch(url)
        .then(res => res.json())
        .then(data => displayWeather(data));
    }
}

const displayWeather = data =>{
    if(typeof data.name == 'undefined'){
        dataArea.textContent = '';
        notificaiton.innerHTML = `<p class="text-danger">We couldn't recognize your city. Please try again.</p>`;
        notificaiton.style.display= "block";
        hideSpinner();
        return;
    }
    else{
        notificaiton.style.display= "none";
        notificaiton.innerHTML = `<p class="text-success">Great! Check the details below.</p>`;
        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        dataArea.textContent = '';
        dataArea.innerHTML= `
        <img src="${weatherIcon}" alt="Weather Icon">
        <h2>${data.name}</h2>
        <h5>${data.main.temp}°C</h5>
        <p>${data.weather[0].main} 
        <small>(${data.weather[0].description})</small></p>
        <!-- Show more modal button -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">More Details
        </button>
        `;        
        
        const modalTitle =document.getElementById('modal-title');
        modalTitle.innerHTML = `Temparature Details of ${data.name}`;
        hideSpinner();
    }
     
}



