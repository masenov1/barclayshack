var express = require("express");
var app = express();
app.use(express.logger());
var restler = require('restler');
var qs = require('querystring');

  var wolfram = require('wolfram-alpha').createClient("4EU37Y-TX9WJG3JH3", null);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

app.all('/', function(request, response) {
console.log("- "+request.body);


    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {

            var POST = qs.parse(body);
           console.log("->?" + POST);

        });
    }



wolfram.query("What is mitosis?", function (err, result) {
  if (err) throw err;
  console.log("- %j",result);
  if(result[1].subpods[0]){
   response.send("<Response><Sms>" +result[1].subpods[0].text+ "</Sms></Response>");
   }else{
   response.send("<Response><Sms>" +result[0].subpods[0].text+ "</Sms></Response>");
   }
});

});
