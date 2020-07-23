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
  




  // function get5DayForeCast(cityName) {
  //   var 
  // }

  function updateBigScreen(weatherObj, uvObject) {
    let date = new Date();
    console.log(weatherObj);
    console.log("City : ", weatherObj.name + " (" + date.toDateString() + ")");
    console.log("Date : ", date.toDateString());
    console.log("Temperature : ", (weatherObj.main.temp - 273.15)*9/5 + 32);
    console.log("Humidity : ", weatherObj.main.humidity + "%");
    console.log("Wind : ", weatherObj.wind.speed);
    console.log("Description : ", weatherObj.weather[0].description);
    console.log("Icon : ", weatherObj.weather[0].icon);
    var iconLink = "http://openweathermap.org/img/wn/" + weatherObj.weather[0].icon + ".png";
    // console.log(iconLink);
    console.log(uvObject);
    $("#city-name-large").text(weatherObj.name + " (" + date.toDateString() + ")");
    $(".weather-icon").attr("src",iconLink);
    $("#temp").text("Temperature:  " + Math.round((weatherObj.main.temp - 273.15)*9/5 + 32) + " F");
    $("#humid").text("Humidity:  " + weatherObj.main.humidity + " %");
    $("#speed").text("Wind Speed:  " + weatherObj.wind.speed);
    $("#desc").text("Condition:  " + weatherObj.weather[0].description);
    $("#uv-index").text("UV Index:  " + uvObject.value);
    $("#date").text(uvObject.date_iso);



    // for (i=0;i<5;i++) {
    //   console.log("Date : ", date.toDateString());
    //   console.log("Temperature : ", (weatherObj.list[i].main.temp - 273.15)*9/5 + 32);
    //   console.log("Humidity : ", weatherObj.list[i].humidity);
    //   console.log("Description : ", weatherObj.list[i].weather[0].description);
    //   console.log("Wind : ", weatherObj.list[i].wind.speed);
    //   console.log("Icon : ", weatherObj.list[i].weather[0].icon);



    //   var iconLink = "http://openweathermap.org/img/wn/" + weatherObj.list[i].weather[0].icon + ".png";
    //   console.log(iconLink);
    // }
    
  }
  function getUvIndex(lat, lon) {
    var queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`;

    $.ajax({
      url: queryURL2,
      method: "GET"
      })
      .then(function(response2) {
        
        console.log(queryURL2);
        console.log(response2);
        uvIndex = response2;
        console.log(uvIndex.value);
        return uvIndex;
      })
      return uvIndex;
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
  
      console.log(queryURL1);

      let uvObj = getUvIndex(response1.coord.lat, response1.coord.lon);

      updateBigScreen(response1, uvObj);
  }
  )

  }


  function updateLocalStorage(cityName) {
    if (!cityName) {
      return null;
    }
    searchArray.push(cityName);
    localStorage.setItem("search-history", searchArray);
  }


  function updateSearchHistory(cityName) {
    if (!cityName) {
      return null;
    }
    $(".search-list").prepend($("<li class='list-group-item search-item'>").text(cityName));
  }

  function getInputFromSearch() {
    console.log($("#search-input").val());
    if ($("#search-input").val()) {
      let cityNameInput = $("#search-input").val();
      return cityNameInput;
    }
    else {
      return null;
    }    
  }


  $("#search-button").on("click", function(event) {
    event.preventDefault();
    let cityName = getInputFromSearch().trim();
    updateLocalStorage(cityName);
    updateSearchHistory(cityName);
    let weatherObj = getCurrentWeather(cityName); 
  })


  $(".search-list").on("click", function(event) {
    console.log(event.target.textContent);
    if (event.target.textContent) {
      getCurrentWeather(event.target.textContent);
      
    }
  })

})