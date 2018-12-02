const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const driverRoutes = require('./driver.route');
const clientRequestRoutes = require('./client-request.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
/**
 * @swagger
 * /health-check:
 *   get:
 *     description: Check service health
 *     responses:
 *       200:
 *         description: 'OK'
 */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

router.use('/drivers', driverRoutes);
router.use('/client-requests', clientRequestRoutes);

module.exports = router;
