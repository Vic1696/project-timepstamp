const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/", (req, res) => {
  const date = new Date()
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})

app.get("/api/:date?", function(req, res) {
  const date = req.params.date; 
  const three = 2;
  const newDate = new Date();
  let isDate = new Date(date)
  if (!date) {
    res.json({ unix: newDate.getTime(), utc: newDate.toUTCString()})
  } else {
    const resultTimestamp = Date.parse(date)
    if (!resultTimestamp) {
      const parsedDate = new Date(Number(date));
      if(!Number(date)) {
        res.json({error: 'Invalid Date'})
      }
      const utcString = parsedDate.toUTCString();
      res.json({ unix: Number(date), utc: utcString })
    } else {
      const parsedDate = new Date(date);
      const utcString = parsedDate.toUTCString();
      res.json({ unix: resultTimestamp, utc: utcString })

    }
  }
});


var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
