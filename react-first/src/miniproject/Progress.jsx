import React from 'react';
import { useGameStats } from '../context/GameStatsContext';

const GameProgressCard = ({ game, stats, emoji }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h2 className="text-2xl font-bold mb-4 flex items-center">
      <span className="text-3xl mr-2">{emoji}</span>
      {game.charAt(0).toUpperCase() + game.slice(1)} Game
    </h2>
    <div className="space-y-3">
      <p>High Score: {stats.highScore}</p>
      <p>Games Played: {stats.gamesPlayed}</p>
      <p>Last Played: {stats.lastPlayed ? new Date(stats.lastPlayed).toLocaleString() : 'Never'}</p>
    </div>
  </div>
);

const Progress = () => {
  const { gameStats } = useGameStats();

  const calculateLevelProgress = () => {
    // Level 1 progress (Emoji game)
    const level1Progress = gameStats.emoji?.highScore >= 10 ? 100 : (gameStats.emoji?.highScore || 0) * 10;

    // Level 2 progress (Word and Math games)
    let level2Progress = 0;
    if (level1Progress === 100) { // Only calculate if Level 1 is complete
      const wordScore = gameStats.word?.highScore || 0;
      const mathScore = gameStats.math?.highScore || 0;
      level2Progress = ((wordScore >= 10 ? 10 : wordScore) + (mathScore >= 10 ? 10 : mathScore)) * 5;
    }

    // Level 3 progress (Science, Math Puzzle, and Geography games)
    let level3Progress = 0;
    if (level2Progress === 100) { // Only calculate if Level 2 is complete
      const scienceScore = gameStats.science?.highScore || 0;
      const mathPuzzleScore = gameStats.mathPuzzle?.highScore || 0;
      const geographyScore = gameStats.geography?.highScore || 0;
      level3Progress = ((scienceScore >= 10 ? 10 : scienceScore) + 
                       (mathPuzzleScore >= 10 ? 10 : mathPuzzleScore) + 
                       (geographyScore >= 10 ? 10 : geographyScore)) * (100/30);
    }

    return { level1Progress, level2Progress, level3Progress };
  };

  const { level1Progress, level2Progress, level3Progress } = calculateLevelProgress();

  const gameEmojis = {
    emoji: '😊',
    word: '📝',
    math: '🔢',
    science: '🔬',
    mathPuzzle: '🧮',
    geography: '🌎'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Learning Progress</h1>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="h-8 rounded-full overflow-hidden flex">
          {/* Level 1 Segment */}
          <div 
            className="h-full bg-gray-200 transition-all duration-500 flex items-center justify-center text-white font-bold relative"
            style={{ width: '33.33%' }}
          >
            <div 
              className="absolute inset-0 bg-green-500"
              style={{ width: `${Math.min(level1Progress, 100)}%` }}
            />
            <span className="z-10">Level 1</span>
          </div>
          {/* Level 2 Segment */}
          <div 
            className="h-full bg-gray-200 transition-all duration-500 flex items-center justify-center text-white font-bold relative"
            style={{ width: '33.33%' }}
          >
            <div 
              className="absolute inset-0 bg-yellow-500"
              style={{ width: `${Math.min(level2Progress, 100)}%` }}
            />
            <span className="z-10">Level 2</span>
          </div>
          {/* Level 3 Segment */}
          <div 
            className="h-full bg-gray-200 transition-all duration-500 flex items-center justify-center text-white font-bold relative"
            style={{ width: '33.33%' }}
          >
            <div 
              className="absolute inset-0 bg-red-500"
              style={{ width: `${Math.min(level3Progress, 100)}%` }}
            />
            <span className="z-10">Level 3</span>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Beginner {Math.round(level1Progress)}%</span>
          <span>Intermediate {Math.round(level2Progress)}%</span>
          <span>Advanced {Math.round(level3Progress)}%</span>
        </div>
      </div>

      {/* Level 1 Games */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Level 1 - Beginner</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gameStats.emoji && (
            <GameProgressCard game="emoji" stats={gameStats.emoji} emoji={gameEmojis.emoji} />
          )}
        </div>
      </div>

      {/* Level 2 Games */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Level 2 - Intermediate</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gameStats.word && (
            <GameProgressCard game="word" stats={gameStats.word} emoji={gameEmojis.word} />
          )}
          {gameStats.math && (
            <GameProgressCard game="math" stats={gameStats.math} emoji={gameEmojis.math} />
          )}
        </div>
      </div>

      {/* Level 3 Games */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Level 3 - Advanced</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gameStats.science && (
            <GameProgressCard game="science" stats={gameStats.science} emoji={gameEmojis.science} />
          )}
          {gameStats.mathPuzzle && (
            <GameProgressCard game="mathPuzzle" stats={gameStats.mathPuzzle} emoji={gameEmojis.mathPuzzle} />
          )}
          {gameStats.geography && (
            <GameProgressCard game="geography" stats={gameStats.geography} emoji={gameEmojis.geography} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;