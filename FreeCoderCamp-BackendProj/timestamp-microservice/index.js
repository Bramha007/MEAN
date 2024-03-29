// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(express.json());
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api", (req, res, next) => {
  const dateIp = new Date();
  return res.json({ unix: Number(dateIp), utc: dateIp.toUTCString() });
});

app.get("/api/:date", (req, res, next) => {
  let dateIp = new Date(req.params.date);
  if (dateIp === "") {
    dateIp = new Date();
    return res.json({
      unix: Number(dateIp),
      utc: dateIp.toUTCString(),
    });
  }
  if (dateIp.toString() === "Invalid Date") {
    dateIp = new Date(Number(req.params.date));
    if (dateIp.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    return res.json({
      unix: Number(req.params.date),
      utc: dateIp.toUTCString(),
    });
  }
  return res.json({ unix: Number(dateIp), utc: dateIp.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
