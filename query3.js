var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://user1:arijeet1@ds231991.mlab.com:31991/machinedetails";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("machinedetails");
  //var query = { address: "Park Lane 38" };
  dbo.collection("esp").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});