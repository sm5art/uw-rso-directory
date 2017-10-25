const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db')

var app = express();


app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/api/getRsoData.json', function (req, res) {
  const query = req.query;
  console.log(query);
  db.queryRsoInformation(query, (rsoInfo) => {
    res.json(rsoInfo)
  })
});

app.get('/api/getRsoTypes.json', function (req, res) {
  db.queryRsoTypes((rsoTypes) => {
    res.json(rsoTypes)
  })
});

app.get('*', (req, res) => {
  res.render('index.ejs')
});

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port 3000!')
})
