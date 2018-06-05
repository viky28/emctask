var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var config  = require("./config.json");
var number = require("./controller/number");

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({}));
app.use('/public', express.static(path.join(__dirname, '../web/public')))

app.use(function(req, res, next) {
    if(req.body){
        console.log("[INPUT]:",req.url, JSON.stringify(req.body));
        var end = res.end;
        res.end = function(chunk, encoding){
            res.end = end;
            if (chunk) {
                console.log("[OUTPUT]:",req.url, chunk.toString('utf8'));
            }
            res.end(chunk, encoding);
        };
        next();

    }
});

app.post('/app', function (req, res, next) {
    if(!req.body.cmd){
        res.status(404).send("")
        return;
    }
    var cmd=req.body.cmd;
    if(number[cmd]){
        number[cmd](req,res)
    } else {
        res.status(404).send("def");
    }
})


app.listen(3000, function(){
	console.log("Server listening at 3000");
})