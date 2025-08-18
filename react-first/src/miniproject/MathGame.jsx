import React, { useState, useEffect } from 'react';
import { useGameStats } from '../context/GameStatsContext';

const MathGame = () => {
  const [problem, setProblem] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { updateMathStats } = useGameStats();

  const generateProblem = () => {
    let num1, num2, operation;
    const operations = ['+', '-', '*'];
    operation = operations[Math.floor(Math.random() * operations.length)];
    
    if (operation === '*') {
      num1 = Math.floor(Math.random() * 12);
      num2 = Math.floor(Math.random() * 12);
    } else {
      num1 = Math.floor(Math.random() * 20);
      num2 = Math.floor(Math.random() * 20);
    }

    // Ensure subtraction doesn't result in negative numbers
    if (operation === '-' && num2 > num1) {
      [num1, num2] = [num2, num1];
    }

    const answer = operation === '+' ? num1 + num2 :
                   operation === '-' ? num1 - num2 :
                   num1 * num2;

    setProblem({ num1, num2, operation, answer });
    setUserAnswer('');
    setFeedback('');
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const [gameEnded, setGameEnded] = useState(false);

  const handleEndGame = () => {
    setGameEnded(true);
    updateMathStats(score);
    setFeedback(`Game Over! Final score: ${score}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameEnded) return;

    const numAnswer = parseInt(userAnswer);

    if (numAnswer === problem.answer) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback('Correct! 🎉');
      setTimeout(() => {
        generateProblem();
      }, 1000);
    } else {
      setFeedback(`Try again! The answer was ${problem.answer}`);
      setTimeout(() => {
        generateProblem();
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">Math Game</h1>
      


      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="text-4xl text-center mb-6">
          {problem.num1} {problem.operation} {problem.num2} = ?
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-24 px-4 py-2 text-2xl text-center border rounded-lg mb-4"
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Check Answer
          </button>
        </form>
      </div>

      {feedback && (
        <div className={`text-center text-xl ${feedback.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>
          {feedback}
        </div>
      )}

      <div className="text-center mt-6 space-y-4">
        <p className="text-xl">Score: {score}</p>
        {!gameEnded ? (
          <button
            onClick={handleEndGame}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            End Game
          </button>
        ) : (
          <button
            onClick={() => {
              setScore(0);
              setGameEnded(false);
              setFeedback('');
              generateProblem();
            }}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default MathGame;