const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const authCtrl = require('../controllers/auth.controller');
const driverCtrl = require('../controllers/driver.controller');
const config = require('../../config/config');

/**
 * @swagger
 * /drivers:
 *  get:
 *    tags: ["driver"]
 *    summary: Get list drivers
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 *  post:
 *    tags: ["driver"]
 *    summary: Create a driver
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: request payload
 *        description: Driver payload.
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            status:
 *              type: string
 *            lat:
 *              type: string
 *            long:
 *              type: string
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.route('/')
  .get(driverCtrl.getList)
  .post(driverCtrl.createOne);


/**
 * @swagger
 * /drivers/{driverId}:
 *  delete:
 *    tags: ["driver"]
 *    summary: Delete a driver by id
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 *    parameters:
 *      - name: driverId
 *        in: path
 */
router.route('/:driverId')
  .delete(driverCtrl.deleteById);


/**
 * @swagger
 * /drivers/{driverId}/updateLocation:
 *  put:
 *    tags: ["driver"]
 *    summary: Update driver's location
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 *    parameters:
 *      - name: driverId
 *        in: path
 */
router.route('/:driverId/updateLocation')
  .put(driverCtrl.updateLocation);

module.exports = router;
