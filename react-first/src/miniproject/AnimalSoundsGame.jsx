import React, { useEffect, useState } from "react";
import { useGameStats } from "../context/GameStatsContext";

const AnimalSoundsGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const { updateAnimalSoundsStats } = useGameStats();

  useEffect(() => {
    fetch("http://localhost:5000/api/animalsounds/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions || []));
  }, []);

  const handleAnswer = (option) => {
    if (gameEnded) return;
    setSelected(option);
    const correct = questions[currentIndex].animal === option;
    if (correct) {
      setScore((prev) => prev + 1);
      setFeedback("Correct! 🐾");
    } else {
      setFeedback(`Wrong! The correct animal is ${questions[currentIndex].animal}`);
    }
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
        setFeedback("");
      } else {
        setGameEnded(true);
        // Optionally send score to backend
        fetch("http://localhost:5000/api/animalsounds/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score }),
        });
        if (updateAnimalSoundsStats) updateAnimalSoundsStats(score);
      }
    }, 1500);
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFeedback("");
    setGameEnded(false);
  };

  if (!questions.length) {
    return <div className="text-center mt-10">Loading questions...</div>;
  }

  const current = questions[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">Animals and Their Sounds</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="text-xl text-center mb-6 font-mono">
          Which animal is this?
        </div>
        <div className="text-center mb-6">
          <img src={current.image} alt={current.animal} className="mx-auto h-32" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {current.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className={`p-4 text-center rounded-lg transition-colors w-full ${selected
                ? option === current.animal
                  ? "bg-green-500 text-white"
                  : option === selected
                  ? "bg-red-500 text-white"
                  : "bg-gray-100"
                : "bg-gray-100 hover:bg-blue-100"}`}
              disabled={!!selected || gameEnded}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && (
          <div className="mt-6 text-center text-xl text-blue-600">{feedback}</div>
        )}
      </div>
      <div className="text-center mt-6">
        <p className="text-xl">Score: {score}</p>
        <p className="text-lg text-gray-600">Question {currentIndex + 1} of {questions.length}</p>
        {gameEnded && (
          <button
            onClick={restartGame}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default AnimalSoundsGame; 