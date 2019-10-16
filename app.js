window.addEventListener('load',()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/cdb894cb733f59d1932b73cb671d11ca/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then (data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                // Set DOM Elements from the API
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // formula for celsius
                let celsius = Math.floor((temperature - 32) * (5/9));

                setIcons(icon, document.getElementById('icon'))

                // Change temperature to Celsius / Farenheit
                temperatureSection.addEventListener('click', () =>{
                    if (temperatureSpan.textContent === "F")
                    {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = celsius;
                    }
                    else
                    {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temperature);
                    }
                });
            })
        });
    }

    function setIcons(icon, iconID)
    {
        const skycons = new Skycons({color: 'white'})
        const currentIcon = icon.replace(/-/g,"_").toUpperCase()
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
});