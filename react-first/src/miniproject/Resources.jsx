import React from 'react';
import { useGameStats } from '../context/GameStatsContext';

const ResourceCard = ({ title, description, type, difficulty, link }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
        difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {difficulty}
      </span>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-blue-600">{type}</span>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-300"
        >
          Learn More
        </a>
      )}
    </div>
  </div>
);

function Resources() {
  const { gameStats } = useGameStats();

  const getRecommendedResources = () => {
    const resources = [];

    // Math-related recommendations
    if (gameStats.math?.gamesPlayed > 0 || gameStats.mathPuzzle?.gamesPlayed > 0) {
      const mathScore = (gameStats.math?.highScore || 0) + (gameStats.mathPuzzle?.highScore || 0);
      resources.push({
        title: mathScore < 50 ? 'Basic Math Operations' : 'Advanced Math Concepts',
        description: mathScore < 50 ?
          'Master the fundamentals of addition, subtraction, multiplication, and division.' :
          'Explore advanced mathematical concepts and problem-solving strategies.',
        type: 'Mathematics',
        difficulty: mathScore < 50 ? 'Beginner' : 'Intermediate',
        link: 'https://www.khanacademy.org/math'
      });
    }

    // Language-related recommendations
    if (gameStats.word?.gamesPlayed > 0) {
      resources.push({
        title: 'Vocabulary Builder',
        description: 'Enhance your vocabulary with interactive exercises and word games.',
        type: 'Language',
        difficulty: gameStats.word.highScore < 30 ? 'Beginner' : 'Intermediate',
        link: 'https://www.vocabulary.com'
      });
    }

    // Geography-related recommendations
    if (gameStats.geography?.gamesPlayed > 0) {
      resources.push({
        title: 'World Geography Explorer',
        description: 'Learn about countries, capitals, and cultures around the world.',
        type: 'Geography',
        difficulty: 'Intermediate',
        link: 'https://www.nationalgeographic.com/education'
      });
    }

    // Science-related recommendations
    if (gameStats.science?.gamesPlayed > 0) {
      resources.push({
        title: 'Science Discovery Hub',
        description: 'Explore fascinating scientific concepts and experiments.',
        type: 'Science',
        difficulty: gameStats.science.correctAnswers < 20 ? 'Beginner' : 'Intermediate',
        link: 'https://www.sciencekids.co.nz'
      });
    }

    // Emoji game recommendations
    if (gameStats.emoji?.gamesPlayed > 0) {
      resources.push({
        title: 'Emotional Intelligence',
        description: 'Learn more about understanding and expressing emotions.',
        type: 'Social Skills',
        difficulty: gameStats.emoji.highScore < 5 ? 'Beginner' : 'Intermediate',
        link: 'https://www.understood.org/articles/emotional-intelligence-what-it-is-and-why-it-matters'
      });
    }

    // Add default resources for new users
    if (Object.keys(gameStats).length === 0 || !Object.values(gameStats).some(stat => stat?.gamesPlayed > 0)) {
      resources.push({
        title: 'Getting Started Guide',
        description: 'Learn how to make the most of our educational games and resources.',
        type: 'General',
        difficulty: 'Beginner',
        link: null
      });
    }

    return resources;
  };

  const recommendedResources = getRecommendedResources();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Learning Resources</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>

      {/* Achievement Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(gameStats).map(([game, stats]) => {
            if (!stats || !stats.gamesPlayed) return null;
            return (
              <div key={game} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-2">{game.charAt(0).toUpperCase() + game.slice(1)} Master</h3>
                <p className="text-gray-600">Completed {stats.gamesPlayed} games with a high score of {stats.highScore}!</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Resources;