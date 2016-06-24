var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
require('dotenv').config();
var uberServerToken = process.env.API_UBER
var https = ('https')
Uber = require('uber-api')({server_token: uberServerToken, version:'v1'});


// Serve assets in /public.
app.use(express.static(__dirname + '/public'));

// So we can POST.
app.use(bodyParser.urlencoded({
	extended: true
}));

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
	origin: /^[^.\s]+\.mixmax\.com$/,
	credentials: true
};

// The editor interface.
app.get('/estimate', function(req, res) {
	res.sendFile(__dirname + '/estimate.html');
});

app.post('/uberPrice', function(req, res) {
	var coordinates = req.body;
	var options = {
				sLat:coordinates.coordinates.lat1,
				sLng:coordinates.coordinates.lng1,
				eLat:coordinates.coordinates.lat2,
				eLng:coordinates.coordinates.lng2
				};
	
	Uber.getPriceEstimate(options , function (error, response) {
		if (error) {
			console.log("the error is ", error);
		} else {
			res.send(response);
		}

    });
});


// The in-email representation.
app.post('/api/resolver', cors(corsOptions), require('./api/resolver'));

app.listen(process.env.PORT || 3000);
