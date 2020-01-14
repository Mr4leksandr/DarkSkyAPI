window.addEventListener('load', () => {
    //alert('Hello');
    let long = 59.43696;
    let lat = 24.75353;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    let temperatureSectionSpan = document.querySelector(".degree-section span");

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `${proxyUrl}https://api.darksky.net/forecast/f10055e5000599b7c2fe214629db4b3b/${lat},${long}`;
    console.log(apiUrl);

    fetch(apiUrl)
    .then(response => {
        return response.json();
    })
    .then(data =>{
        console.log(data);
        const {temperature, summary, icon} = data.currently;
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;

        let celsius =(temperature-32)*(5/9);
        //set icon
        setIcons(icon,document.querySelector('.icon'));

        temperatureSection.addEventListener('click', () => {
            if(temperatureSectionSpan.textContent === 'F'){
                temperatureSectionSpan.textContent = 'C';
                temperatureDegree.textContent = Math.floor(celsius);
            }else{
                temperatureSectionSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
            }
        });
        
        
    });

//get user's geolocation data
    /*if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log('Long', long);
            console.log('lat', lat);
        })
    }*/


    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = Icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);
    }

});