const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const authCtrl = require('../controllers/auth.controller');
const clientRequestCtrl = require('../controllers/client-request.controller');
const config = require('../../config/config');

router.route('/')
  .get(clientRequestCtrl.getList);

module.exports = router;
