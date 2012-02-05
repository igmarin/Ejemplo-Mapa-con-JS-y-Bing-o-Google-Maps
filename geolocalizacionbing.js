var ejecutar = {
  init: function(){
    if (navigator.geolocation) {
      var mapa = document.getElementById("mapa");
      navigator.geolocation.getCurrentPosition(ejecutar.verMapa, ejecutar.displayError);
    }
  },
  verMapa: function(position){
	 var cred = "Crea tu Key de Microsoft Bing";
   var userLocation = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
   map = new Microsoft.Maps.Map(mapa, { credentials: cred});

   map.setView({ center: userLocation, zoom: 17 });

   var locationArea = ejecutar.dibujarCirculo(userLocation);
   map.entities.push(locationArea);

  },
  dibujarCirculo: function(loc){
    var radius = 100;
    var R = 6378137;
    var lat = (loc.latitude * Math.PI) / 180;
	  var lon = (loc.longitude * Math.PI) / 180;
	  var d = parseFloat(radius) / R;
	  var locs = new Array();
	  for (x = 0; x <= 360; x++) {
	    var p = new Microsoft.Maps.Location();
	    brng = x * Math.PI / 180;
	    p.latitude = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat) * Math.sin(d) * Math.cos(brng));
	    p.longitude = ((lon + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(p.latitude))) * 180) / Math.PI;
	    p.latitude = (p.latitude * 180) / Math.PI;
	    locs.push(p);
	   }
	   
     return new Microsoft.Maps.Polygon(locs, { fillColor: new Microsoft.Maps.Color(125, 0, 0, 255), strokeColor: new Microsoft.Maps.Color(0, 0, 0, 255) });
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
  }
};

ejecutar.init();
