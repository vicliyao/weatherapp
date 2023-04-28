//Create the variable for latitude
//Create the variable for longitude


window.onload = function(){
    const date=new Date();
    const dateString = (date.getMonth()+1)+"/" + date.getDate() + "/" + date.getFullYear();


    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(success);
    }else{
        console.log("Geolocation is not available in your browser.");

    }
}

function success(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
}