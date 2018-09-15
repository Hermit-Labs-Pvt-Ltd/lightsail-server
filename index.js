const mqtt = require ('mqtt');
const fs = require('fs');
var WebSocketServer = require("ws").Server;
const https = require('https');
const server = new https.createServer({
  cert: fs.readFileSync('/etc/lego/certificates/www.mqtest.cf.crt'),
  key: fs.readFileSync('/etc/lego/certificates/www.mqtest.cf.key')
});
var wss = new WebSocketServer({server});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var client  = mqtt.connect('1883:www.mqtest.cf');
client.on('connect', function () {
  client.subscribe('hello/cat');
  console.log('client has subscribed successfully');
});

client.on('message',function(topic,message) {
  var d = new Date();
    kat = message.toString();
    sat = JSON.parse(kat);
    sat["year"] = d.getFullYear();
    sat["month"] = d.getMonth()+1;
    
    sat["date"] = d.getDate();
    sat["hour"] = d.getHours();
    sat["minutes"] = d.getMinutes();
    sat["seconds"] = d.getSeconds();
    sat["milliseconds"] = d.getMilliseconds();
    sat["day"] = d.getDay();
    sat["totmili"] = d.getTime();
    //sat["info"] = d; 
   // sat["info"] = d;
   nat = JSON.stringify(sat);
   MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  //var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("esp").insertOne(sat, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
    //var offset = (new Date().getTimezoneOffset() / 60) * -1;
    //console.log(offset);
   // console.log(d);
    console.log(nat);
    wss.clients.forEach(function(client) {
    client.send(nat);
  });
    //client.end();
  });

wss.on("connection",function(ws) {
  
  
  ws.send("Welcome Tega Broker");

});

server.listen(3000);