//Create the variable for latitude
//Create the variable for longitude
let latitude = 0;
let longitude = 0;


window.onload = function(){
    const date=new Date();
    const dateString = (date.getMonth()+1)+"/" + date.getDate() + "/" + date.getFullYear();
    document.getElementById("date").innerHTML = dateString;
    

    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(success);
    }else{
        console.log("Geolocation is not available in your browser.");

    }



function success(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude,longitude);
}

    const btn = document.getElementById("getWeatherBtn");

    btn.addEventListener('click',function(){
        const xhr = new XMLHttpRequest(); //Define XMLhttp object
        xhr.open('GET',`http://localhost:3000/weather/${latitude}/${longitude}`);
        xhr.send(); //Send requent

        xhr.onload = function(){ //Once we get response
            const body = JSON.parse(xhr.responseText)  //Transfer from JSON format
            let temp = body.temperature;
            let weatherStatus = body.weatherStatus;
            document.getElementById('temperature').innerHTML = `Temperature:${temp} °F`;
            document.getElementById('weatherStatus').innerHTML = `Weather Status: ${weatherStatus}`;


        }
        // var location= 'Santa Cruz';
        // var temp = 59;
        //  var loc_temp = `In ${location} it is ${temp} degrees`; //Backtick. Allow string to include variables

        // ~~~~~~~~~~~~~~~~~~~~ 5-Day Forecast ~~~~~~~~~~~~~~~~~~~~~~~~~
        
            const xhr2 = new XMLHttpRequest(); //Define XMLhttp object
            xhr2.open('GET',`http://localhost:3000/5day/${latitude}/${longitude}`);
            xhr2.send(); //Send requent
    
            xhr2.onload = function(){ //Once we get response
                const body = JSON.parse(xhr2.responseText);  //Transfer from JSON format
                let forecast = body;

                let forecastElements = document.getElementsByClassName('forecast'); //5 classes named forecast
                for (var i=0; i < forecast.length; i++){
                    forecastElements[i].innerHTML = `${forecast[i].dayName}: ${forecast[i].temp}°F`;
                }

    
            }
        
    
        })    
    }
    


