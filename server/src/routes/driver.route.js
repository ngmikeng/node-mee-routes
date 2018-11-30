const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const authCtrl = require('../controllers/auth.controller');
const driverCtrl = require('../controllers/driver.controller');
const config = require('../../config/config');

router.route('/')
  .get((req, res, next) => {
    driverCtrl.getList().then((result) =>
      res.json({
        data: result
      })
    ).catch(err => next(err))
  });

module.exports = router;