const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const clientRequestCtrl = require('../controllers/client-request.controller');
const config = require('../../config/config');

/**
 * @swagger
 * /client-requests:
 *  get:
 *    tags: ["client-request"]
 *    summary: Get list client requests
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
 *    tags: ["client-request"]
 *    summary: Create a client request
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: request payload
 *        description: Client request payload.
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            phone:
 *              type: string
 *            address:
 *              type: string
 *            note:
 *              type: string
 *            lat:
 *              type: string
 *            long:
 *              type: string
 *            status:
 *              type: string
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.route('/')
  .all(expressJwt({ secret: config.jwtSecret }))
  .get(clientRequestCtrl.getList)
  .post(clientRequestCtrl.createOne);

/**
 * @swagger
 * /client-requests/direction:
 *  get:
 *    tags: ["client-requests"]
 *    summary: Get direction
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
 *      - name: origin
 *        in: query
 *      - name: destination
 *        in: query
 */
router.route('/direction')
  .get(clientRequestCtrl.getDirection)

/** Load client request detail when API with requestId route parameter is hit */
router.param('requestId', clientRequestCtrl.loadById);

/**
 * @swagger
 * /client-requests/{requestId}:
 *  get:
 *    tags: ["client-requests"]
 *    summary: Get a client request by id
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
 *      - name: requestId
 *        in: path
 *  put:
 *    tags: ["client-requests"]
 *    summary: Update client request's details
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
 *      - name: requestId
 *        in: path
 *  delete:
 *    tags: ["client-requests"]
 *    summary: Delete a client request by id
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
 *      - name: requestId
 *        in: path
 */
router.route('/:requestId')
  .get(clientRequestCtrl.getOne)
  .put(clientRequestCtrl.updateOne)
  .delete(clientRequestCtrl.deleteById);

/**
 * @swagger
 * /client-requests/{requestId}/updatePickupLocation:
 *  put:
 *    tags: ["client-requests"]
 *    summary: Update client request's pick up location
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
 *      - name: requestId
 *        in: path
 */
router.route('/:requestId/updatePickupLocation')
  .put(clientRequestCtrl.updatePickupLocation);


module.exports = router;
