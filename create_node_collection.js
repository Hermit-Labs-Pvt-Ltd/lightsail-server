var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://user1:arijeet1@ds231991.mlab.com:31991/machinedetails";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("machinedetails");
  dbo.createCollection("esp", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});