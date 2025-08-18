import React, { useState, useEffect } from "react";
import { useGameStats } from '../context/GameStatsContext';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Mapping letters to their corresponding words and emojis
const letterData = {
  A: { word: "Apple", emoji: "🍎" },
  B: { word: "Ball", emoji: "⚽" },
  C: { word: "Cat", emoji: "🐱" },
  D: { word: "Dog", emoji: "🐶" },
  E: { word: "Elephant", emoji: "🐘" },
  F: { word: "Fish", emoji: "🐠" },
  G: { word: "Goat", emoji: "🐐" },
  H: { word: "Hat", emoji: "🎩" },
  I: { word: "Ice cream", emoji: "🍦" },
  J: { word: "Jar", emoji: "🏺" },
  K: { word: "Kite", emoji: "🪁" },
  L: { word: "Lion", emoji: "🦁" },
  M: { word: "Monkey", emoji: "🐒" },
  N: { word: "Nest", emoji: "🪺" },
  O: { word: "Orange", emoji: "🍊" },
  P: { word: "Peacock", emoji: "🦚" },
  Q: { word: "Queen", emoji: "👑" },
  R: { word: "Rabbit", emoji: "🐰" },
  S: { word: "Strawberry", emoji: "🍓" },
  T: { word: "Tree", emoji: "🌳" },
  U: { word: "Umbrella", emoji: "☔" },
  V: { word: "Van", emoji: "🚐" },
  W: { word: "Watermelon", emoji: "🍉" },
  X: { word: "X-Ray", emoji: "🩻" },
  Y: { word: "Yak", emoji: "🦬" },
  Z: { word: "Zebra", emoji: "🦓" },
};

const AlphabetGame = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [learnedLetters, setLearnedLetters] = useState(new Set());
  const { updateAlphabetStats } = useGameStats();

  useEffect(() => {
    return () => {
      setSelectedLetter(null);
      setLearnedLetters(new Set());
    };
  }, []);

  useEffect(() => {
    if (learnedLetters.size > 0) {
      updateAlphabetStats(learnedLetters.size);
    }
  }, [learnedLetters, updateAlphabetStats]);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    if (!learnedLetters.has(letter)) {
      setLearnedLetters(prev => new Set([...prev, letter]));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Alphabet Learning Adventure</h1>
      
      <div className="mb-8">
        <div className="text-lg text-center mb-4">
          Letters Learned: {learnedLetters.size} / 26
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${(learnedLetters.size / 26) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-13 gap-4 mb-8">
        {letters.split("").map((letter) => (
          <button
            key={letter}
            className={`w-full aspect-square rounded-lg text-2xl font-bold transition-all duration-300
              ${learnedLetters.has(letter) ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-800'}
              ${selectedLetter === letter ? 'ring-4 ring-blue-500' : ''}
              hover:transform hover:scale-105`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {selectedLetter && (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-6xl mb-4">{letterData[selectedLetter].emoji}</div>
          <div className="text-4xl font-bold mb-2">{selectedLetter}</div>
          <div className="text-2xl text-gray-600">
            is for {letterData[selectedLetter].word}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetGame;
