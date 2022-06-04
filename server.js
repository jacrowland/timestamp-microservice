const express = require('express');
let app = express();

//var cors = require('cors');
//app.use(cors({optionsSuccessStatus: 200}));

app.listen(8080);

function rootLogger(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  }

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
  

app.use(rootLogger);

app.get('/api/:date?', (req, res) => {
    let date;

    if (req.params.date === undefined) {
      date = new Date();
    }
    else {
      let isUnix = req.params.date.match(/\d{13}/) !== null;
      date = isUnix ? new Date(parseInt(req.params.date)) : new Date(req.params.date);

      if (date == "Invalid Date") {
        return res.json({"error":"Invalid Date"});
      }
    }

    let unixTimeStamp =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    let UTCString = date.toUTCString();

    return res.json({unix: unixTimeStamp, utc: UTCString});
  });
