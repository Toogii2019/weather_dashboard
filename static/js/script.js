// function getUsersLocation() {

//     const status = document.querySelector('#status');
//     const mapLink = document.querySelector('#map-link');
  
//     mapLink.href = '';
//     mapLink.textContent = '';
  
//     function success(position) {
//       const latitude  = position.coords.latitude;
//       const longitude = position.coords.longitude;
  
//       status.textContent = '';
//       mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
//       mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
//     }
  
//     function error() {
//       status.textContent = 'Unable to retrieve your location';
//     }
  
//     if(!navigator.geolocation) {
//       status.textContent = 'Geolocation is not supported by your browser';
//     } else {
//       status.textContent = 'Locating…';
//       navigator.geolocation.getCurrentPosition(success, error);
//     }
  
//   }

  $("document").ready(function() {
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var cityName = "Seattle";
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Bujumbura,Burundi&appid=" + APIKey;
    var queryURL1 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
    url: queryURL1,
    method: "GET"
    })
  // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);
}
) 
  $("#search-button").on("click", function(event) {
    event.preventDefault();
    console.log("test");
  })

})