var express = require("express");
var app = express();
app.use(express.logger());
var restler = require('restler');
var qs = require('querystring');
var url = require('url');

  var wolfram = require('wolfram-alpha').createClient("4EU37Y-TX9WJG3JH3", null);

var port = process.env.PORT || 5001;
app.listen(port, function() {
//  console.log("Listening on " + port);
});

app.all('/', function(request, response) {
	
var url_parts = url.parse(request.url, true);
var query = url_parts.query;
console.log("--*-*********************************"+query.Body+"");


var q = query.Body;
wolfram.query(q, function (err, result) {
  if (err) throw err;
  console.log("- %j",result);
  
if(result.length){
	if(result[1]){
if(result[1].subpods[0]){
   response.send("<Response><Sms>" +result[1].subpods[0].text+ "</Sms></Response>");
} else{
   response.send("<Response><Sms>" +result[0].subpods[0].text+ "</Sms></Response>");
  }
}else{
 response.send("<Response><Sms>" +result[0].subpods[0].text+ "</Sms></Response>");
}
}else{
 response.send("<Response><Sms>I'm sorry I don't know, please ask your teacher.</Sms></Response>");
}

});

});
