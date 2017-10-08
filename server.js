const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var app = express();


app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  res.render('index.ejs')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
