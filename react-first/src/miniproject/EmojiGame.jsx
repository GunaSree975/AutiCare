import React, { useState, useEffect } from "react";
import { useGameStats } from '../context/GameStatsContext';

const expressions = [
  { text: "Happy", emoji: "😊", hint: "When you feel good and joyful" },
  { text: "Sad", emoji: "😢", hint: "When you feel down or upset" },
  { text: "Angry", emoji: "😠", hint: "When something makes you mad" },
  { text: "Surprised", emoji: "😲", hint: "When something unexpected happens" },
  { text: "Confused", emoji: "😕", hint: "When you don't understand something" },
  { text: "Excited", emoji: "🤩", hint: "When you're really happy about something" },
  { text: "Sleepy", emoji: "😴", hint: "When you feel tired" },
  { text: "Silly", emoji: "🤪", hint: "When you're being funny and playful" }
];

const EmojiGame = () => {
  const [currentExpressionIndex, setCurrentExpressionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const { updateEmojiStats } = useGameStats();

  const handleEndGame = () => {
    setGameEnded(true);
    updateEmojiStats(score);
    setResultMessage(`Game Over! Final score: ${score}`);
  };

  useEffect(() => {
    // Shuffle expressions at the start of the game
    setCurrentExpressionIndex(Math.floor(Math.random() * expressions.length));
  }, []);

  const checkAnswer = (selectedIndex) => {
    if (gameEnded) return;

    const currentExpression = expressions[currentExpressionIndex];
    const isCorrect = expressions[selectedIndex].emoji === currentExpression.emoji;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setResultMessage(`Correct! 🎉 Your score: ${score + 1}`);
    } else {
      setResultMessage(
        `Try again! The correct emoji was: ${currentExpression.emoji}`
      );
    }

    if (score + (isCorrect ? 1 : 0) >= 10) {
      setGameEnded(true);
      updateEmojiStats(score + (isCorrect ? 1 : 0));
      setResultMessage(`Game Over! Final score: ${score + (isCorrect ? 1 : 0)}`);
    } else {
      setShowNextButton(true);
    }
  };

  const nextExpression = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * expressions.length);
    } while (newIndex === currentExpressionIndex);
    
    setCurrentExpressionIndex(newIndex);
    setResultMessage("");
    setShowNextButton(false);
    setShowHint(false);
  };

  const restartGame = () => {
    setScore(0);
    setGameEnded(false);
    setResultMessage("");
    setShowNextButton(false);
    setShowHint(false);
    nextExpression();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Emoji Expression Match!</h1>
        
        <div className="text-center mb-6">
          <div className="text-2xl font-bold mb-2">{expressions[currentExpressionIndex].text}</div>
          {showHint && (
            <div className="text-gray-600 italic">
              Hint: {expressions[currentExpressionIndex].hint}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {expressions.map((exp, index) => (
            <button
              key={index}
              className="text-4xl p-4 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => checkAnswer(index)}
              disabled={gameEnded}
            >
              {exp.emoji}
            </button>
          ))}
        </div>

        <div className="text-center space-y-4">
          {!showNextButton && !gameEnded && (
            <button
              onClick={() => setShowHint(true)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Need a Hint?
            </button>
          )}

          {showNextButton && !gameEnded && (
            <button
              onClick={nextExpression}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next Expression
            </button>
          )}

          {!gameEnded ? (
            <button
              onClick={handleEndGame}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors mr-2"
            >
              End Game
            </button>
          ) : (
            <button
              onClick={restartGame}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Play Again
            </button>
          )}

          <div className="text-xl font-bold">
            Score: {score}
          </div>

          {resultMessage && (
            <div className={`text-lg ${resultMessage.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
              {resultMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmojiGame;
