var Country = require('../models/countryModel');
var express = require('express');
var router = express.Router();

router.route('/movies').get(function(req, res) {
  Country.find(function(err, movies) {
    if (err) {
      return res.send(err);
    }
    res.json(movies);
  });

});

module.exports = router;