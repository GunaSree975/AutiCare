import React, { useState, useEffect } from 'react';
import { useGameStats } from '../context/GameStatsContext';

const puzzles = [
  {
    story: 'You find a magical garden with flower beds. There are 3 rows of flowers, with 4 flowers in each row. How many flowers are there in total?',
    operation: '*',
    numbers: [3, 4],
    answer: 12,
    hint: 'Think about multiplication as repeated addition: 4 + 4 + 4'
  },
  {
    story: 'You\'re helping forest animals gather acorns. If each squirrel collects 5 acorns and there are 2 squirrels, how many acorns were collected?',
    operation: '*',
    numbers: [5, 2],
    answer: 10,
    hint: 'Each squirrel got the same number of acorns'
  },
  {
    story: 'You discover a treasure chest with 20 gold coins. You share them equally with your friend. How many coins do you each get?',
    operation: '/',
    numbers: [20, 2],
    answer: 10,
    hint: 'Sharing equally means dividing into equal parts'
  },
  {
    story: 'You\'re building a bridge across a river. You have 24 planks of wood and use 4 planks for each section. How many sections can you build?',
    operation: '/',
    numbers: [24, 4],
    answer: 6,
    hint: 'Think about how many groups of 4 you can make from 24'
  },
  {
    story: 'In the enchanted bakery, each magic cake needs 3 cups of flour. If you have 15 cups of flour, how many cakes can you make?',
    operation: '/',
    numbers: [15, 3],
    answer: 5,
    hint: 'How many groups of 3 cups can you make?'
  },
  {
    story: 'You\'re creating a potion that requires mixing 6 drops of each ingredient. If you need 4 different ingredients, how many drops in total?',
    operation: '*',
    numbers: [6, 4],
    answer: 24,
    hint: 'Each ingredient needs the same number of drops'
  },
  {
    story: 'You\'re organizing a feast for woodland creatures. If you need 8 berries for each plate and you\'re making 7 plates, how many berries do you need?',
    operation: '*',
    numbers: [8, 7],
    answer: 56,
    hint: 'Think about 8 berries repeated 7 times'
  },
  {
    story: 'The wizard\'s library has 48 spell books that need to be arranged equally on 6 shelves. How many books should go on each shelf?',
    operation: '/',
    numbers: [48, 6],
    answer: 8,
    hint: 'Divide the total books into equal groups for each shelf'
  },
  {
    story: 'You\'re creating a magical garden pattern with crystals. If you need 9 crystals for each pattern and you want to make 5 patterns, how many crystals do you need?',
    operation: '*',
    numbers: [9, 5],
    answer: 45,
    hint: 'Each pattern uses the same number of crystals'
  }
];

const MathPuzzleGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const { updateMathPuzzleStats } = useGameStats();

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setPuzzleIndex(0);
    setScore(0);
    setPuzzlesSolved(0);
    setGameEnded(false);
    setCurrentPuzzle(puzzles[0]);
    setUserAnswer('');
    setFeedback('');
    setShowHint(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameEnded) return;

    const numAnswer = parseInt(userAnswer);
    const isCorrect = numAnswer === currentPuzzle.answer;

    if (isCorrect) {
      setScore(score + 1);
      setPuzzlesSolved(puzzlesSolved + 1);
      setFeedback('Correct! 🎉');

      setTimeout(() => {
        if (puzzleIndex < puzzles.length - 1) {
          setPuzzleIndex(puzzleIndex + 1);
          setCurrentPuzzle(puzzles[puzzleIndex + 1]);
          setUserAnswer('');
          setFeedback('');
          setShowHint(false);
        } else {
          setGameEnded(true);
          updateMathPuzzleStats(score + 1, puzzlesSolved + 1);
        }
      }, 1500);
    } else {
      setFeedback('Try again! 🤔');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Math Puzzle Adventure</h1>



      {currentPuzzle && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-xl mb-6">
            {currentPuzzle.story}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-24 px-4 py-2 text-2xl text-center border rounded-lg mb-4"
              placeholder="?"
              autoFocus
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                disabled={gameEnded}
              >
                Check Answer
              </button>
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                disabled={showHint || gameEnded}
              >
                Need a Hint?
              </button>
            </div>
          </form>

          {showHint && (
            <div className="mt-6 p-4 bg-yellow-100 rounded-lg">
              <p className="text-yellow-800">{currentPuzzle.hint}</p>
            </div>
          )}

          {feedback && (
            <div className={`mt-6 text-center text-xl ${feedback.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>
              {feedback}
            </div>
          )}
        </div>
      )}

      <div className="text-center">
        <p className="text-xl mb-2">Puzzle {puzzleIndex + 1} of {puzzles.length}</p>
        <p className="text-xl">Score: {score}</p>
        <p className="text-lg text-gray-600">Puzzles Solved: {puzzlesSolved}</p>

        {!gameEnded ? (
          <button
            onClick={() => {
              setGameEnded(true);
              updateMathPuzzleStats(score, puzzlesSolved);
            }}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            End Game
          </button>
        ) : (
          <div className="mt-6">
            <p className="text-2xl font-bold mb-4">
              Adventure Complete! Final Score: {score} out of {puzzles.length}
            </p>
            <button
              onClick={startNewGame}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Start New Adventure
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathPuzzleGame;