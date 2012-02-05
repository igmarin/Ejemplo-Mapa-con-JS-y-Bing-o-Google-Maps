var ejecutar = {
  init: function(){
    var mapa = document.getElementById("mapa");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(ejecutar.verMapa, ejecutar.displayError);
    }
  },
  displayError: function(error){
    var errorTypes = {
      0: "Unknown error",
      1: "Permission denied by user",
      2: "Position not available",
      3: "Time out"
    };

    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
      errorMessage = errorMessage + " " + error.message;
    }
    mapa.innerHTML = errorMessage;
 }, 
 verMapa: function(position) {
   var googleLatAndLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   var mapOptions = {
     zoom: 10,
     center: googleLatAndLong,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   };

   map = new google.maps.Map(mapa, mapOptions);

   var title = "Mi ubicación";
   var content = "Me encuentro en: " + position.coords.latitude + " y longitude: " + position.coords.longitude + " y con una certitud de " + position.coords.accuracy;
   ejecutar.addMarker(map, googleLatAndLong, title, content);
 },
 addMarker: function(map, latlong, title, content){
    var markerOptions = {
      position: latlong, map: map, title: title, clickable: true
    };
    var infoWindowOptions = {
      content: content, position: latlong
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    var marker =     new google.maps.Marker(markerOptions);
    google.maps.event.addListener(marker, "click", function(){
      infoWindow.open(map);
    });
 }
};

ejecutar.init();
