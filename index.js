const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;

  const date = dateParam 
    ? isNaN(dateParam)
      ? new Date(dateParam)
      : new Date(parseInt(dateParam))
    : new Date();

    if(isNaN(date.getTime())) {
      return res.json({error: "Invalid Date"});
    }

    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
