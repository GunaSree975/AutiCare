const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// Get user's game statistics
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('gameStats');
    res.json(user.gameStats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game statistics' });
  }
});

// Update game statistics
router.put('/:game', protect, async (req, res) => {
  try {
    const { game } = req.params;
    const stats = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update specific game stats
    user.gameStats[game] = {
      ...user.gameStats[game],
      ...stats
    };

    // Recalculate total games played
    user.gameStats.totalGamesPlayed = Object.keys(user.gameStats)
      .filter(key => key !== 'totalGamesPlayed')
      .reduce((total, key) => total + (user.gameStats[key].gamesPlayed || 0), 0);

    await user.save();
    res.json(user.gameStats);
  } catch (error) {
    res.status(500).json({ message: 'Error updating game statistics' });
  }
});

module.exports = router;