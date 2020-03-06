const express = require('express');
const app = express();

app.use(express.static(__dirname + "/assets/"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/api/timestamp', (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  });
});

app.get('/api/timestamp/:date_string', (req, res) => {
  const date_string = req.params.date_string;
  // Check wheather the date_string consist of digits only.
  if (/^\d*$/.test(date_string)) {
    // Create a new Date object by casting date_string to Number from String (default parameter type).
    const date = new Date(Number(date_string));
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
  else {
    const date = new Date(date_string);
    // Check if the date is a valid date object.
    if (date.toString() === "Invalid Date") {
      res.json({error: "Invalid Date"});
    }
    else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on loclhost:3000");
});