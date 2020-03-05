const express = require('express');
const app = express();

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
    if (date instanceof Date && !isNaN(date)) {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    }
    else {
      res.json({error: "Invalid Date"});
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on loclhost:3000");
});