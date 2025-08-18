const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  gameStats: {
    emoji: {
      highScore: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 },
      lastPlayed: { type: Date, default: null }
    },
    // memory: {
    //   highScore: { type: Number, default: 0 },
    //   gamesPlayed: { type: Number, default: 0 },
    //   lastPlayed: { type: Date, default: null }
    // },
    // alphabet: {
    //   highScore: { type: Number, default: 0 },
    //   gamesPlayed: { type: Number, default: 0 },
    //   lastPlayed: { type: Date, default: null }
    // },
    math: {
      highScore: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 },
      lastPlayed: { type: Date, default: null }
    },
    word: {
      highScore: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 },
      lastPlayed: { type: Date, default: null }
    },
    science: {
      highScore: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 },
      lastPlayed: { type: Date, default: null }
    },
    geography: {
      highScore: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 },
      lastPlayed: { type: Date, default: null }
    },
    mathPuzzle: {
      highScore: { type: Number, default: 0 },
      gamesPlayed: { type: Number, default: 0 },
      lastPlayed: { type: Date, default: null },
      puzzlesSolved: { type: Number, default: 0 }

    },
    totalGamesPlayed: { type: Number, default: 0 }
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;