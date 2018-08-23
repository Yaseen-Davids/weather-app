var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var apiKey = '7b7fb6d9d6b0601d6568664f2da91a31';

router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Weather App',
    weather: null,
    error: null
  });
});

router.post('/', function(req, res, next){
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {
        title: 'Weather',
        weather: null,
        error: 'Error, please try again'
      });
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {
          title: 'Weather',
          weather: null,
          error: 'Error, please try again'
        });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {
          title: 'Weather',
          weather: weatherText,
          error: null
        });
      }
    }
  });
})

module.exports = router;
