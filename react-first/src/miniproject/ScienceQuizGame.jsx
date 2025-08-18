import React, { useState, useEffect } from 'react';
import { useGameStats } from '../context/GameStatsContext';

const quizQuestions = [
  {
    question: 'What gives plants their green color?',
    options: ['Chlorophyll', 'Water', 'Sunlight', 'Soil'],
    answer: 'Chlorophyll',
    explanation: 'Chlorophyll is the green pigment that helps plants make their own food!'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    answer: 'Mars',
    explanation: 'Mars appears red because of iron oxide (rust) on its surface!'
  },
  {
    question: 'What do we call animals that eat both plants and meat?',
    options: ['Herbivores', 'Carnivores', 'Omnivores', 'Producers'],
    answer: 'Omnivores',
    explanation: 'Omnivores can eat both plants and animals, just like humans!'
  },
  {
    question: 'What is the largest organ in the human body?',
    options: ['Heart', 'Brain', 'Skin', 'Liver'],
    answer: 'Skin',
    explanation: 'Your skin is like a protective coat for your whole body!'
  },
  {
    question: 'What do caterpillars turn into?',
    options: ['Birds', 'Butterflies', 'Beetles', 'Bees'],
    answer: 'Butterflies',
    explanation: 'This amazing change is called metamorphosis!'
  },
  {
    question: 'Which of these is NOT a state of matter?',
    options: ['Solid', 'Liquid', 'Energy', 'Gas'],
    answer: 'Energy',
    explanation: 'The three main states of matter are solid, liquid, and gas!'
  },
  {
    question: 'What force pulls everything toward the center of the Earth?',
    options: ['Magnetism', 'Electricity', 'Wind', 'Gravity'],
    answer: 'Gravity',
    explanation: 'Gravity keeps us on the ground and makes things fall down!'
  },
  {
    question: 'Which sense organ helps you keep your balance?',
    options: ['Eyes', 'Ears', 'Nose', 'Tongue'],
    answer: 'Ears',
    explanation: 'Your inner ears help you stay balanced!'
  },
  {
    question: 'What do plants need to make their own food?',
    options: ['Just water', 'Water and air', 'Sunlight and water', 'Sunlight, water, and air'],
    answer: 'Sunlight, water, and air',
    explanation: 'Plants use these three things to make food through photosynthesis!'
  },
  {
    question: 'What is the closest star to Earth?',
    options: ['Polaris', 'The Sun', 'Sirius', 'Alpha Centauri'],
    answer: 'The Sun',
    explanation: 'The Sun is our very own star!'
  },
  {
    question: 'What is the process called when plants make their own food?',
    options: ['Digestion', 'Photosynthesis', 'Respiration', 'Absorption'],
    answer: 'Photosynthesis',
    explanation: 'Photo means light, and synthesis means making - plants make food using light!'
  },
  {
    question: 'Which of these is NOT a renewable resource?',
    options: ['Wind', 'Solar', 'Coal', 'Water'],
    answer: 'Coal',
    explanation: 'Coal takes millions of years to form and cannot be easily replaced!'
  },
  {
    question: 'What protects the Earth from harmful radiation from the Sun?',
    options: ['Clouds', 'Ozone Layer', 'Atmosphere', 'Magnetic Field'],
    answer: 'Ozone Layer',
    explanation: 'The ozone layer is like Earth\'s sunscreen!'
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    options: ['Gold', 'Iron', 'Diamond', 'Rock'],
    answer: 'Diamond',
    explanation: 'Diamonds are made of carbon atoms arranged in a special way!'
  },
  {
    question: 'Which scientist discovered gravity when an apple fell on his head?',
    options: ['Einstein', 'Newton', 'Galileo', 'Darwin'],
    answer: 'Newton',
    explanation: 'Sir Isaac Newton developed the theory of gravity!'
  }
];

const ScienceQuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const { updateScienceStats } = useGameStats();

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setGameEnded(false);
    setCurrentQuestion(quizQuestions[0]);
    setShowExplanation(false);
  };

  const handleAnswer = (selectedAnswer) => {
    if (gameEnded || showExplanation) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    }

    setShowExplanation(true);

    setTimeout(() => {
      if (questionIndex < quizQuestions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setCurrentQuestion(quizQuestions[questionIndex + 1]);
        setShowExplanation(false);
      } else {
        setGameEnded(true);
        updateScienceStats(score + (isCorrect ? 1 : 0), correctAnswers + (isCorrect ? 1 : 0));
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Science Quiz</h1>



      {currentQuestion && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-xl font-semibold mb-6">
            {currentQuestion.question}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`p-4 text-left rounded-lg transition-colors ${showExplanation
                  ? option === currentQuestion.answer
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100'
                  : 'bg-gray-100 hover:bg-gray-200'}`}
                disabled={showExplanation}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <p className="text-blue-800">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}

      <div className="text-center">
        <p className="text-xl mb-2">Question {questionIndex + 1} of {quizQuestions.length}</p>
        <p className="text-xl">Score: {score}</p>
        <p className="text-lg text-gray-600">Correct Answers: {correctAnswers}</p>

        {!gameEnded ? (
          <button
            onClick={() => {
              setGameEnded(true);
              updateScienceStats(score, correctAnswers);
            }}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            End Game
          </button>
        ) : (
          <div className="mt-6">
            <p className="text-2xl font-bold mb-4">
              Final Score: {score} out of {quizQuestions.length}
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

export default ScienceQuizGame;