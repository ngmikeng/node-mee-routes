const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const validate = require('express-validation');
const config = require('../../config/config');
const userCtrl = require('../controllers/user.controller');
const userValidation = require('../validation/user');

/**
 * @swagger
 * /users:
 *  get:
 *    tags: ["user"]
 *    summary: Get list users
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
 *    tags: ["user"]
 *    summary: Create an user
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: request payload
 *        description: User payload.
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            fullName:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.route('/')
  .all(expressJwt({ secret: config.jwtSecret }))
  /** GET /api/v1/users - Get list of users */
  .get(userCtrl.list)
  /** POST /api/users - Create new user */
  .post(validate(userValidation.createUser), userCtrl.create);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *    tags: [user]
 *    summary: Get an user by user's id
 *    security:
 *      - ApiKeyAuth: []
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        description: User's id.
 *    responses:
 *      200:
 *        description: 'OK'
 *      401:
 *        description: 'Unauthorized'
 */
router.route('/:userId')
  /** GET /api/v1/users/:userId - Get user */
  .get(validate(userValidation.getById), userCtrl.get)

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
