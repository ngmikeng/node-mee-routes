const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const authCtrl = require('../controllers/auth.controller');
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
  .get(clientRequestCtrl.getList)
  .post(clientRequestCtrl.createOne);

module.exports = router;
