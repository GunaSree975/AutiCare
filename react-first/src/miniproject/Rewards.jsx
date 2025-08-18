import React from 'react';
import { useGameStats } from '../context/GameStatsContext';

const Rewards = () => {
  const { gameStats } = useGameStats();
  

  const badges = [
    {
      id: 'game-explorer',
      name: 'Game Explorer',
      description: 'Try all available games',
      emoji: '🎮',
      isEarned: gameStats.emoji?.gamesPlayed > 0 && gameStats.word?.gamesPlayed > 0 && gameStats.mathPuzzle?.gamesPlayed > 0 && gameStats.math?.gamesPlayed > 0 && gameStats.science?.gamesPlayed > 0 && gameStats.geography?.gamesPlayed > 0
    },
    {
      id: 'high-achiever',
      name: 'High Achiever',
      description: 'Achieve a perfect score of 10 in all games',
      emoji: '🏆',
      isEarned: Object.entries(gameStats).every(([key, stats]) => {
        if (key === 'totalGamesPlayed') return true;
        return stats && stats.gamesPlayed > 0 && stats.highScore >= 10;
      })
    },
    {
      id: 'dedicated-learner',
      name: 'Dedicated Learner',
      description: 'Play 50 total games',
      emoji: '📚',
      isEarned: gameStats.totalGamesPlayed >= 50
    },
    // {
    //   id: 'geography-master',
    //   name: 'Geography Master',
    //   description: 'Learn 20 locations in Geography Game',
    //   emoji: '🌍',
    //   isEarned: gameStats.geography.locationsLearned >= 20
    // },
    {
      id: 'puzzle-solver',
      name: 'Puzzle Solver',
      description: 'Solve 10 math puzzles',
      emoji: '🧩',
      isEarned:gameStats.mathPuzzle.puzzlesSolved >= 10
    },
    // {
    //   id: 'science-whiz',
    //   name: 'Science Whiz',
    //   description: 'Get 20 correct answers in Science Quiz',
    //   emoji: '🔬',
    //   isEarned: gameStats.science && gameStats.science.correctAnswers >= 20
    // }
  ];

  const earnedBadges = badges.filter(badge => badge.isEarned);
  const remainingBadges = badges.filter(badge => !badge.isEarned);

  return (
    <div className="container mx-auto px-4 py-8">
     

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Earned Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map(badge => (
              <div key={badge.id} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">{badge.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                <p className="text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {remainingBadges.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Badges to Earn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {remainingBadges.map(badge => (
              <div key={badge.id} className="bg-gray-100 rounded-lg shadow-lg p-6 opacity-75">
                <div className="text-4xl mb-2 filter grayscale">{badge.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                <p className="text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;