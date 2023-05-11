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


    const btn = document.getElementById("getWeatherBtn");

    btn.addEventListener('click',()=>{
        const xhr = new XMLHttpRequest(); //Define XMLhttp object
        xhr.open('GET',`localhost:3000/weather/${latitude}/${longitude}`);
        xhr.send(); //Send requent

        xhr.onload = function(){ //Once we get response
            const body = JSON.parse(xhr.responseText)  //Transfer from JSON format
            var temp = body.temperature
            var weatherStatus = body.weatherStatus
            document.getElementById('temperature').innerHTML = `Temperature:${temperature} °F`;
            document.getElementById('weatherStatus').innerHTML = `Weather Status: ${weatherStatus}`;


        }
        // var location= 'Santa Cruz';
        // var temp = 59;
        //  var loc_temp = `In ${location} it is ${temp} degrees`; //Backtick. Allow string to include variables

        // ~~~~~~~~~~~~~~~~~~~~ 5-Day Forecast ~~~~~~~~~~~~~~~~~~~~~~~~~
        
            const xhr2 = new XMLHttpRequest(); //Define XMLhttp object
            xhr2.open('GET',`localhost:3000/weather/${latitude}/${longitude}`);
            xhr2.send(); //Send requent
    
            xhr2.onload = function(){ //Once we get response
                const body = JSON.parse(xhr2.responseText);  //Transfer from JSON format
                let forecast = body.forecast;

                var forecastElements = document.getElementsByClassName('forecast'); //5 classes named forecast
                for (var i=0; i < forecast.length; i++){
                    forecastElements[i].innerHTML = `${forecast[i].dayName}: ${forecast[i].temp}°F`;
                }

    
            }
        
        var forecast = [['M',52],["Tu",53],['W',54],['Th',55],['F',56]]; //Predefined Day/Degree ( Nested Array)
        
        for (var i=0; i<forecast.length; i++){ //loop from 0th index to length-1 index
            forecastElements[i].innerHTML = forecast[i][0] + ':' + forecast[i][1] + '°F';
        }
    });
    }

function success(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude,longitude);
}

