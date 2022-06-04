const express = require('express');
let app = express();

app.listen(8080);

function rootLogger(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  }

app.use(rootLogger);

app.get('/api/:date', (req, res) => {
    //[project url]/api/2015-12-25
    //[project url]/api/1451001600000

    let isUnix = req.params.date.match(/\d{13}/) !== null;
    let isYYMMDD = req.params.date.match(/\d{4}-\d{1,2}-\d{1,2}/) !== null;

    if (!isUnix && !isYYMMDD) {
      res.json({"error":"Invalid Date"});
    }
    else {
      input = isUnix ? parseInt(req.params.date) : req.params.date;
      let date = new Date(input);
      let unixTimeStamp =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
      res.json({unix: unixTimeStamp, utc: date.toUTCString()});
    }
  });
