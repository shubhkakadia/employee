const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/employeeData";

MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(`CONNECTED TO MONGO!`);
  })
  .catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
  });

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("employeeData");
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("Employees").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });
