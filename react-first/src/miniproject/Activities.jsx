import React from 'react';
import { Link } from 'react-router-dom';
import { useGameStats } from '../context/GameStatsContext';
const GameCard = ({ title, description, path, icon, level }) => {
  const { gameStats } = useGameStats();
  
  const getGameStats = (path) => {
    const gameType = path.split('/').pop();
    return gameStats[gameType] || {};
  };

  const stats = getGameStats(path);
  const hasProgress = stats.gamesPlayed > 0;

  const checkLevelAccess = () => {
    if (level === 1) return true;
    
    if (level === 2) {
      // Check if all Level 1 games have score >= 10
      return gameStats.emoji?.highScore >= 10;
    }

    if (level === 3) {
      // Check if all Level 2 games have score >= 10
      return gameStats.word?.highScore >= 10 && gameStats.math?.highScore >= 10;
    }

    return false;
  };

  const isLocked = !checkLevelAccess();

  return (
    <div className={`block ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}>
      <Link to={isLocked ? '#' : path} className={isLocked ? 'pointer-events-none' : ''}>
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="text-4xl">{icon}</div>
          {hasProgress && (
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Played: {stats.gamesPlayed}
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        {hasProgress && (
          <div className="text-sm text-gray-500">
            {stats.highScore !== undefined && (
              <div>High Score: {stats.highScore}</div>
            )}
            {stats.totalScore !== undefined && (
              <div>Total Score: {stats.totalScore}</div>
            )}
            {stats.matchesFound !== undefined && (
              <div>Matches Found: {stats.matchesFound}</div>
            )}
            {stats.correctAnswers !== undefined && (
              <div>Correct Answers: {stats.correctAnswers}</div>
            )}
          </div>
        )}
        {isLocked && (
          <div className="mt-4 text-red-500 text-sm">
            {level === 2 ? 'Score 10 or higher in Level 1 game to unlock' : 'Score 10 or higher in all Level 2 games to unlock'}
          </div>
        )}
      </div>
    </Link>
    </div>
  );
};

function Activities() {
  return (
   
<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Fun Learning Games</h1>

      {/* Level 1 Games */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Level 1 - Beginner</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GameCard
            title="Emoji Match"
            description="Match emotions with the correct emoji! Learn about different expressions."
            path="/activities/emoji"
            icon="😊"
            level={1}
          />
          <GameCard
            title="Animals and Their Sounds"
            description="Learn about animals and the sounds they make!"
            path="/activities/animalsounds"
            icon="🐘"
            level={1}
          />
        </div>
      </div>

      {/* Level 2 Games */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Level 2 - Intermediate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GameCard
            title="Word Scramble"
            description="Unscramble letters to discover words and expand your vocabulary!"
            path="/activities/wordscramble"
            icon="📝"
            level={2}
          />
          <GameCard
            title="Math Magic"
            description="Practice basic math operations in a fun and engaging way!"
            path="/activities/mathgame"
            icon="🔢"
            level={2}
          />
        </div>
      </div>

      {/* Level 3 Games */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Level 3 - Advanced</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GameCard
            title="Science Quiz"
            description="Test your knowledge of science with exciting questions and facts!"
            path="/activities/sciencequiz"
            icon="🔬"
            level={3}
          />
          <GameCard
            title="Math Puzzle Adventure"
            description="Solve story-based math puzzles in a magical world of numbers!"
            path="/activities/mathpuzzle"
            icon="🧮"
            level={3}
          />
          <GameCard
            title="Geography Explorer"
            description="Travel the world and learn about countries, capitals, and fascinating facts!"
            path="/activities/geography"
            icon="🌎"
            level={3}
          />
        </div>
      </div>
    </div>

  )
}

export default Activities