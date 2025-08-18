const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const gameStatsRoutes = require('./gameStats');

// Mount routes
router.use('/auth', authRoutes);
router.use('/game-stats', gameStatsRoutes);

module.exports = router;