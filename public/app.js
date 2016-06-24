var autocomplete,
formattedOriginLtLg,
formattedDestinLtLg,
autocompleteEnd,
endAddress, 
startAddress,
directionsDisplay,
map,
options,
address,
origin,
destination,
markerArray = [];


$('document').ready(function() {

    $('form.findPrice').on('submit',function(e){
        e.preventDefault();
        address = $(this).serializeArray();
        origin = address[0].value;
        destination = address[1].value;
        mapCoordinates(origin, destination);
    });
})


// function initAutocomplete() {
//      autocomplete = new google.maps.places.Autocomplete((document.getElementById('start')), options);
  
//      autocompleteEnd = new google.maps.places.Autocomplete((document.getElementById('end')), options);
  
// }


function mapCoordinates(addressOne, addressTwo){
    var startAddress = addressOne.replace(/\s|,/g,"+");
    var endAddress = addressTwo.replace(/\s|,/g,"+");
    
    $.when(
        $.get("https://maps.googleapis.com/maps/api/geocode/json?", {"address" : startAddress}, function(data){
          var originLtLg = data.results[0].geometry.location;
        }),

        $.get("https://maps.googleapis.com/maps/api/geocode/json?", {"address" : endAddress}, function(data){
          var destinLtLg = data.results[0].geometry.location;
        })

    ).done(function(originLtLg, destinLtLg){    
        formattedOriginLtLg = originLtLg[0].results[0].geometry.location
        formattedDestinLtLg = destinLtLg[0].results[0].geometry.location
        renderGoogleMap(formattedOriginLtLg, formattedDestinLtLg);


        getRidePrices(formattedOriginLtLg, formattedDestinLtLg);




    }).fail(function() {
        console.log("oops, something went wrong while getting directions");

    });
}

function renderGoogleMap(originCoord, destinCoord){
  
    var directionsService = new google.maps.DirectionsService();
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

        })
    })
  
    // /*Create a Renderer for Directions and Binds it to the Map*/
    var directionsDisplay = new google.maps.DirectionsRenderer({map: map}); 
    
    /////////// CalcRoute is for Google////////////////////////
    calcRoute(originCoord, destinCoord)

    function calcRoute(startCoord, endCoord) {
        var start = startCoord
        var end = endCoord
        var request = {
          origin:start,
          destination:end,
          travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });

    }

}





/*FS Displays the Route Between the Initial Start and End Selections.*/
// calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);







/* Calculate Display Route Function*/

// function calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map) {
      
//   First, remove any existing markers from the map.
//   for (var i = 0; i < markerArray.length; i++) {
//     markerArray[i].setMap(null);
//   }




  /* Retrieve the Start and End Locations and Create a DirectionsRequest Using DRIVING Directions.*/
 //  directionsService.route({
 //                            origin: origin,
 //                            destination: destination,
 //                            travelMode: google.maps.TravelMode.DRIVING
 //                          }, 
 //                          function(response, status){

 //                              // Route the directions and pass the response to a function to create
 //                              // markers for each step.
 //                            if (status === google.maps.DirectionsStatus.OK) {

 //                                  document.getElementById('warnings-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';


 //                                  directionsDisplay.setDirections(response);
 //                                  // showSteps(response, markerArray, stepDisplay, map);
 //                              } 
 //                            else {
 //                                window.alert('Directions request failed due to ' + status);
 //                            }
 //                        });
 
 // }



// /*Request Ride Prices Function*/

function getRidePrices(origin, destination){
    var coordinates = {};
    coordinates.lat1 = origin.lat;
    coordinates.lng1 = origin.lng;
    coordinates.lat2 = destination.lat;
    coordinates.lng2 = destination.lng;

    $.post('/uberPrice', {coordinates: coordinates}, function(data){
        var rides = data.prices;
        $.each( rides, function( i, ride ) {
            
            console.log(ride);
            var newListItem = ("<tr><td>" + ride.display_name + "</td><td>" + ride.estimate + "</td><td>" + ride.distance + " miles"+ "</td></tr>");
            // var newListItem = "<li>" + ride.display_name + "</li>";
            $( "#estimates" ).append( newListItem );
        });

    });

};







