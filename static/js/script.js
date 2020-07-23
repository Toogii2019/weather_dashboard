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
    // Here we are building the URL we need to query the database
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Bujumbura,Burundi&appid=" + APIKey;
    // Here we run our AJAX call to the OpenWeatherMap API
  
  var searchArray = [];
  var iconCode = "04d";
  var date;

  function updateSmallScreen(weatherObj) {
    for (i=0;i<5;i++) {
      let dateUnix = weatherObj.list[i+1].dt;
      getNormalDate(dateUnix, i);
      let iconLink = "http://openweathermap.org/img/wn/" + weatherObj.list[i+1].weather[0].icon + ".png";
      // $("div.day-1 > div#small-date").text(date);
      $(`div.day-${i+1} > img#small-weather-icon`).attr("src", iconLink);
      $(`div.day-${i+1} > div#small-temp`).text("Temp: " + Math.round((weatherObj.list[i+1].temp.day - 273.15)*9/5 + 32) + " F");
      $(`div.day-${i+1} > div#small-humidity`).text("Humidity: " + weatherObj.list[i+1].humidity);
    }
  }

  function get5DayForeCast(cityName) {
    var queryUrl1 = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=5&appid=${APIKey}`
    
    $.ajax({
      url: queryUrl1,
      method: "GET"
      })
      .then(function(response1) {
        
        updateSmallScreen(response1);

      })

  }

  function getNormalDate(dateUnix, index) {
    var queryUrl1 = `https://showcase.api.linx.twenty57.net/UnixTime/fromunixtimestamp?unixtimestamp=${dateUnix}`;

    $.ajax({
      url: queryUrl1,
      method: "GET"
      })
      .then(function(response1) {
        
        console.log(response1.Datetime);
        date = response1.Datetime.split(" ")[0];
        $(`div.day-${index + 1} > div#small-date`).text(date);
      })
  }


  // function get5DayForeCast(cityName) {
  //   var 
  // }
  var uvIndex = 0;
  function updateBigScreen(weatherObj) {
    let date = new Date();
    var iconLink = "http://openweathermap.org/img/wn/" + weatherObj.weather[0].icon + ".png";

    $("#city-name-large").text(weatherObj.name + " (" + date.toDateString() + ")");
    $(".weather-icon").attr("src",iconLink);
    $("#temp").text("Temperature:  " + Math.round((weatherObj.main.temp - 273.15)*9/5 + 32) + " F");
    $("#humid").text("Humidity:  " + weatherObj.main.humidity + " %");
    $("#speed").text("Wind Speed:  " + weatherObj.wind.speed);
    $("#desc").text("Condition:  " + weatherObj.weather[0].description);
 }
  function getUvIndex(lat, lon) {
    var queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`;

    $.ajax({
      url: queryURL2,
      method: "GET"
      })
      .then(function(response2) {
        
        uvIndex = response2;
        $("#uv-index").text("UV Index:  " + uvIndex.value);
        $("#date").text(uvIndex.date_iso);

        
      })

      
  }


  function getCurrentWeather(cityName) {
    if (!cityName) {
      return null;
    }
    // var queryURL1 = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&appid=${APIKey}`;
    var queryURL1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
    $.ajax({
      url: queryURL1,
      method: "GET"
      })
      .then(function(response1) {
  
      getUvIndex(response1.coord.lat, response1.coord.lon);

      updateBigScreen(response1, uvIndex);
      get5DayForeCast(cityName);

  }
  )

  }


  function updateLocalStorage(cityName) {
    if (!cityName) {
      return null;
    }
    if (!searchArray.includes(cityName)) {
      searchArray.push(cityName);
      localStorage.setItem("search-history", JSON.stringify(searchArray));
    }
  }


  function updateSearchHistory() {
    searchArray = JSON.parse(localStorage.getItem("search-history"));
    $(".search-list").empty();
    searchArray.forEach(function(item, index) {
      $(".search-list").prepend($("<li class='list-group-item search-item'>").text(item));
      }
    ) 
  }

  function getInputFromSearch() {
    if ($("#search-input").val()) {
      let cityNameInput = $("#search-input").val();
      return cityNameInput;
    }
    else {
      return null;
    }    
  }

  updateSearchHistory();


  $("#search-button").on("click", function(event) {
    event.preventDefault();
    let cityName = getInputFromSearch().trim();
    updateLocalStorage(cityName);
    updateSearchHistory(cityName);
    let weatherObj = getCurrentWeather(cityName); 
  })


  $(".search-list").on("click", function(event) {
    if (event.target.textContent) {
      getCurrentWeather(event.target.textContent);
      
    }
  })

})