var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
require('dotenv').config(); 
// Serve assets in /public.
app.use(express.static(__dirname + '/public'));

// So we can POST.
app.use(bodyParser.urlencoded({
  extended: true
}));

/*Google Api Key*/

// googleApiKey = process.env.GOOGLE_API_KEY;
googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY;
googleVerification = process.env.GOOGLE_VERIFICATION;

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

// The editor interface.
app.get('/estimate', function(req, res) {
  // res.sendFile(__dirname + '/estimate.html');
  res.render('estimate', {APIKey: googlePlacesApiKey})
});


app.post('/estimate', function(req, res) {
  // console.log(req.body.params);
  res.sendStatus(200);
})

// The in-email representation.
app.post('/api/resolver', cors(corsOptions), require('./api/resolver'));

app.listen(process.env.PORT || 3000);
