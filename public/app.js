var autocomplete,
autocompleteEnd,
defaultBounds,
options,
address,
origin,
destination,
markerArray = [],
map;

$('document').ready(function() {
	console.log(options)

	$('form.findPrice').on('submit',function(e){

		initAutocomplete();

		e.preventDefault();
		address = $(this).serializeArray();
		origin = address[0].value;
		destination = address[1].value;
		// mapCoordinates(origin, destination);
		$('.findPrice').trigger('reset');

	});

})

function initAutocomplete() {
  	autocomplete = new google.maps.places.Autocomplete((document.getElementById('start')), options);
  
  	autocompleteEnd = new google.maps.places.Autocomplete((document.getElementById('end')), options);
  
}


function mapCoordinates(addressOne, addressTwo){

    var StartAddress = addressOne.replace(/\s|,/g,"+");
 
    var endAddress = addressTwo.replace(/\s|,/g,"+");
   	console.log()
    $.when(
           $.get("https://maps.googleapis.com/maps/api/geocode/json?", {"address" : StartAddress}, function(data){
              console.log("data, = ", data);
             var originLtLg = data.results[0].geometry.location;
            }),

          $.get("https://maps.googleapis.com/maps/api/geocode/json?", {"address" : endAddress}, function(data){
            var destinLtLg = data.results[0].geometry.location;

          })
    ).then(function(){

    renderGoogleMap(originLtLg,destinLtLg);
    });
}

function renderGoogleMap(originCoord, destinCoord){

    /*Google Maps Directions Variable*/
    var directionsService = new google.maps.DirectionsService;

    $('#map').animate({'height':'384px'},2000, function(){


      map = new google.maps.Map(document.getElementById("map"),{
          center:
          	originCoord,
          	destinCoord,
            zoom:13,
            zoomControl: false,
            scaleControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
      });

      /*Create a Renderer for Directions and Binds it to the Map*/
      var directionsDisplay = new google.maps.DirectionsRenderer({map: map}); 

      /*Instantiate an Info Window to Hold Steps Text*/
      ////////////////// possibly not used//////////////////
      var stepDisplay = new google.maps.InfoWindow;
      ////////////////// possibly not used//////////////////


      /*FS Displays the Route Between the Initial Start and End Selections.*/
      calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);

      // getRidePrices(originCoord, destinCoord);

        });

}

/////////////////////////////

// /*Auto Complete Function*/

// function initAutocomplete() {
  
//   autocomplete = new google.maps.places.Autocomplete((document.getElementById('orin')), options);
  

//   autocompleteEnd = new google.maps.places.Autocomplete((document.getElementById('destin')), options);
  
// }


// /*Generate Coordinates*/

// function mapCoordinates(addressOne, addressTwo){

//     var StartAddress = addressOne.replace(/\s|,/g,"+");
 
//     var endAddress = addressTwo.replace(/\s|,/g,"+");
   
//     $.when(
//            $.get("https://maps.googleapis.com/maps/api/geocode/json?", {"address" : StartAddress}, function(data){
//               console.log("data, = ", data);
//              var originLtLg = data.results[0].geometry.location;
//             }),

//           $.get("https://maps.googleapis.com/maps/api/geocode/json?", {"address" : endAddress}, function(data){
//             var destinLtLg = data.results[0].geometry.location;

//           })
//     ).then(function(){

//     renderGoogleMap(originLtLg,destinLtLg);
     
//     /*End Success Function*/
//     });
// }


// /*Generate Map Google*/

// function renderGoogleMap(originCoord, destinCoord){


//     /*Google Maps Directions Variable*/

//     var directionsService = new google.maps.DirectionsService;

//     $('#map').animate({'height':'384px'},2000, function(){


//       map = new google.maps.Map(document.getElementById("map"),{
//           center:
//           	originCoord,
//           	destinCoord,
//             zoom:13,
//             zoomControl: false,
//             scaleControl: false,
//             scrollwheel: false,
//             disableDoubleClickZoom: true
//       });

//       /*Create a Renderer for Directions and Binds it to the Map*/
//       var directionsDisplay = new google.maps.DirectionsRenderer({map: map}); 

//       /*Instantiate an Info Window to Hold Steps Text*/
//       ////////////////// possibly not used//////////////////
//       var stepDisplay = new google.maps.InfoWindow;
//       ////////////////// possibly not used//////////////////


//       /*FS Displays the Route Between the Initial Start and End Selections.*/
//       calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);

//       getRidePrices(originCoord, destinCoord);

//           End Animate Function
//         });

// /* End Render Google Map Function*/
// }


// /* Calculate Display Route Function*/

// function calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map) {
      
//       /*First, remove any existing markers from the map.*/
//       for (var i = 0; i < markerArray.length; i++) {
//         markerArray[i].setMap(null);
//       }

//      /* Retrieve the Start and End Locations and Create a DirectionsRequest Using DRIVING Directions.*/
      
//       directionsService.route({
//                                 origin: origin,
//                                 destination: destination,
//                                 travelMode: google.maps.TravelMode.DRIVING
//                               }, 
//                               function(response, status){

//                                   // Route the directions and pass the response to a function to create
//                                   // markers for each step.
//                                 if (status === google.maps.DirectionsStatus.OK) {

//                                       document.getElementById('warnings-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';


//                                       directionsDisplay.setDirections(response);
//                                       // showSteps(response, markerArray, stepDisplay, map);
//                                   } 
//                                 else {
//                                     window.alert('Directions request failed due to ' + status);
//                                 }
//                             });
 
//  }



// /*Request Ride Prices Function*/

// var getRidePrices = function(origin, destination){

//       var coordinates = {};
//       coordinates.lat1 = origin.lat;
//       coordinates.lng1 = origin.lng;
//       coordinates.lat2 = destination.lat;
//       coordinates.lng2 = destination.lng;

//       console.log("coordinates object", coordinates);

     
//      $.get('/prices', coordinates, function(prices){
            
//             console.log("prices coming back ", prices.prices);;

//             var rides = prices.prices;

//             rides.forEach(function(ride) {
//             renderRides(ride);
//             });

//      });

// };



