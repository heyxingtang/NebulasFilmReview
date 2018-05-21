'use strict';
var path = require('path');
var util = require('util');
var express = require('express');
var requests = require('request');
var bodyParser = require('body-parser');
var app = express();
var http= require('http').Server(app);
var host = process.env.HOST || "localhost";
var port = process.env.PORT || 8080;
app.use(express.static("./explorer"));
//app.use(express.static(path.join(__dirname,'explorer')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/in_theaters", function (req, res)
{
    console.log("receive requests")
    requests('https://api.douban.com/v2/movie/in_theaters', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        });
}
)

app.get("/top", function (req, res)
{
    console.log("receive requests")
    requests('https://api.douban.com/v2/movie/top250', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
        });
}
)

app.post("/load_single", function (req, res)
{
    console.log("收到请求内容:"+JSON.stringify(req.body));
    requests.post({url:'https://api.douban.com/v2/movie/search', form:{q:req.body.q}}, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    })
}
)

var server = http.listen(80, function() {
    //console.log(`Please open Internet explorer to access ：http://${host}:${port}/`);
    console.log("server start");
});
