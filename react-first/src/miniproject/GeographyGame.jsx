import React, { useState, useEffect } from 'react';
import { useGameStats } from '../context/GameStatsContext';

const geographyQuestions = [
  {
    question: 'Which country is known for kangaroos?',
    options: ['Australia', 'Brazil', 'India', 'Canada'],
    answer: 'Australia',
    fact: 'Australia is home to unique animals like kangaroos and koalas!'
  },
  {
    question: 'Which of these is the largest ocean?',
    options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'],
    answer: 'Pacific',
    fact: 'The Pacific Ocean covers more area than all land on Earth!'
  },
  {
    question: 'What is the capital of the United States?',
    options: ['New York', 'Washington D.C.', 'Los Angeles', 'Chicago'],
    answer: 'Washington D.C.',
    fact: 'Washington D.C. was named after the first U.S. president!'
  },
  {
    question: 'Which continent is the coldest?',
    options: ['Europe', 'North America', 'Asia', 'Antarctica'],
    answer: 'Antarctica',
    fact: 'Antarctica is covered in ice and has no permanent human residents!'
  },
  {
    question: 'Which country is home to the pyramids?',
    options: ['Egypt', 'Mexico', 'China', 'Greece'],
    answer: 'Egypt',
    fact: 'The pyramids were built over 4,500 years ago!'
  },
  {
    question: 'Which is the longest river in the world?',
    options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'],
    answer: 'Nile',
    fact: 'The Nile River flows through 11 countries in Africa!'
  },
  {
    question: 'Which country is shaped like a boot?',
    options: ['Spain', 'France', 'Italy', 'Greece'],
    answer: 'Italy',
    fact: 'Italy is known for pizza, pasta, and ancient Roman history!'
  },
  {
    question: 'What is the capital of Japan?',
    options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
    answer: 'Tokyo',
    fact: 'Tokyo is the largest city in the world!'
  },
  {
    question: 'Which mountain is the tallest in the world?',
    options: ['K2', 'Mount Everest', 'Kilimanjaro', 'Mount Fuji'],
    answer: 'Mount Everest',
    fact: 'Mount Everest grows about 4 millimeters (0.16 inches) every year!'
  },
  {
    question: 'Which desert is the largest in the world?',
    options: ['Gobi', 'Sahara', 'Arabian', 'Mojave'],
    answer: 'Sahara',
    fact: 'The Sahara Desert is almost as large as the United States!'
  },
  {
    question: 'Which country has the most islands in the world?',
    options: ['Indonesia', 'Japan', 'Sweden', 'Philippines'],
    answer: 'Sweden',
    fact: 'Sweden has over 267,570 islands!'
  },
  {
    question: 'What is the smallest country in the world?',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    answer: 'Vatican City',
    fact: 'Vatican City is only 0.44 square kilometers in size!'
  },
  {
    question: 'Which continent has the most countries?',
    options: ['Asia', 'Europe', 'Africa', 'North America'],
    answer: 'Africa',
    fact: 'Africa has 54 independent countries!'
  },
  {
    question: 'Which country is located on two continents?',
    options: ['Russia', 'Turkey', 'Egypt', 'Kazakhstan'],
    answer: 'Turkey',
    fact: 'Turkey is located in both Europe and Asia!'
  },
  {
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    answer: 'Canberra',
    fact: 'Canberra was chosen as the capital to end rivalry between Sydney and Melbourne!'
  }
];

const GeographyGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [locationsLearned, setLocationsLearned] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const { updateGeographyStats } = useGameStats();

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setQuestionIndex(0);
    setScore(0);
    setLocationsLearned(0);
    setGameEnded(false);
    setCurrentQuestion(geographyQuestions[0]);
    setShowFact(false);
  };

  const handleAnswer = (selectedAnswer) => {
    if (gameEnded || showFact) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
      setLocationsLearned(locationsLearned + 1);
    }

    setShowFact(true);

    setTimeout(() => {
      if (questionIndex < geographyQuestions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setCurrentQuestion(geographyQuestions[questionIndex + 1]);
        setShowFact(false);
      } else {
        setGameEnded(true);
        updateGeographyStats(score + (isCorrect ? 1 : 0), locationsLearned + (isCorrect ? 1 : 0));
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Geography Explorer</h1>

      {currentQuestion && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-xl font-semibold mb-6">
            {currentQuestion.question}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`p-4 text-center rounded-lg transition-colors ${showFact
                  ? option === currentQuestion.answer
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100'
                  : 'bg-gray-100 hover:bg-gray-200'}`}
                disabled={showFact}
              >
                {option}
              </button>
            ))}
          </div>

          {showFact && (
            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <p className="text-blue-800">{currentQuestion.fact}</p>
            </div>
          )}
        </div>
      )}

      <div className="text-center">
        <p className="text-xl mb-2">Question {questionIndex + 1} of {geographyQuestions.length}</p>
        <p className="text-xl">Score: {score}</p>
        <p className="text-lg text-gray-600">Locations Learned: {locationsLearned}</p>

        {!gameEnded ? (
          <button
            onClick={() => {
              setGameEnded(true);
              updateGeographyStats(score, locationsLearned);
            }}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            End Game
          </button>
        ) : (
          <div className="mt-6">
            <p className="text-2xl font-bold mb-4">
              Final Score: {score} out of {geographyQuestions.length}
            </p>
            <button
              onClick={startNewGame}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeographyGame;