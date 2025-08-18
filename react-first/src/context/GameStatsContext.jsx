import React, { createContext, useContext, useState, useEffect } from 'react';
import { gameService } from '../services/gameService';

const GameStatsContext = createContext();

export const useGameStats = () => {
  return useContext(GameStatsContext);
};

export const GameStatsProvider = ({ children }) => {







  const [gameStats, setGameStats] = useState({
    emoji: { highScore: 0, gamesPlayed: 0, lastPlayed: null },
    // memory: { highScore: 0, gamesPlayed: 0, lastPlayed: null },
    // alphabet: { highScore: 0, gamesPlayed: 0, lastPlayed: null },
    math: { highScore: 0, gamesPlayed: 0, lastPlayed: null },
    word: { highScore: 0, gamesPlayed: 0, lastPlayed: null },
    science: { highScore: 0, gamesPlayed: 0, lastPlayed: null },
      geography: { highScore: 0, gamesPlayed: 0, lastPlayed: null },
    mathPuzzle: { highScore: 0, gamesPlayed: 0, lastPlayed: null, puzzlesSolved: 0 },
    totalGamesPlayed: 0
  });

  // Fetch initial game stats from backend
  useEffect(() => {
    const fetchGameStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return; // Don't fetch if not authenticated

        const response = await fetch('http://localhost:5000/api/game-stats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setGameStats(data);
        }
      } catch (error) {
        console.error('Error fetching game stats:', error);
      }
    };

    fetchGameStats();
  }, []);



  const calculateTotalGames = (stats) => {
    return stats.emoji.gamesPlayed + stats.memory.gamesPlayed + stats.alphabet.gamesPlayed + 
           stats.math.gamesPlayed + stats.word.gamesPlayed + stats.science.gamesPlayed + 
           stats.geography.gamesPlayed + stats.mathPuzzle.gamesPlayed;
  };

  const updateEmojiStats = async (score) => {
    try {
      const stats = {
        highScore: score,
        gamesPlayed: gameStats.emoji.gamesPlayed + 1,
        lastPlayed: new Date().toISOString()
      };
      const updatedStats = await gameService.updateGameStats('emoji', stats);
      setGameStats(updatedStats);
    } catch (error) {
      setGameStats(prev => {
        const newStats = {
          ...prev,
          emoji: {
            highScore: Math.max(prev.emoji.highScore, score),
            gamesPlayed: prev.emoji.gamesPlayed + 1,
            lastPlayed: new Date().toISOString()
          }
        };
        newStats.totalGamesPlayed = calculateTotalGames(newStats);
        return newStats;
      });
    }
  };

  // const updateMemoryStats = async (timeSpent) => {
  //   try {
  //     const stats = {
  //       highScore: gameStats.memory.highScore
  //         ? Math.min(gameStats.memory.highScore, timeSpent)
  //         : timeSpent,
  //       gamesPlayed: gameStats.memory.gamesPlayed + 1,
  //       lastPlayed: new Date().toISOString()
  //     };
  //     const updatedStats = await gameService.updateGameStats('memory', stats);
  //     setGameStats(updatedStats);
  //   } catch (error) {
  //     setGameStats(prev => {
  //       const newStats = {
  //         ...prev,
  //         memory: {
  //           highScore: prev.memory.highScore
  //             ? Math.min(prev.memory.highScore, timeSpent)
  //             : timeSpent,
  //           gamesPlayed: prev.memory.gamesPlayed + 1,
  //           lastPlayed: new Date().toISOString()
  //         }
  //       };
  //       newStats.totalGamesPlayed = calculateTotalGames(newStats);
  //       return newStats;
  //     });
  //   }
  // };

  // const updateAlphabetStats = async (lettersLearned) => {
  //   try {
  //     const stats = {
  //       highScore: Math.max(gameStats.alphabet.highScore, lettersLearned),
  //       gamesPlayed: gameStats.alphabet.gamesPlayed + 1,
  //       lastPlayed: new Date().toISOString()
  //     };
  //     const updatedStats = await gameService.updateGameStats('alphabet', stats);
  //     setGameStats(updatedStats);
  //   } catch (error) {
  //     setGameStats(prev => {
  //       const newStats = {
  //         ...prev,
  //         alphabet: {
  //           highScore: Math.max(prev.alphabet.highScore, lettersLearned),
  //           gamesPlayed: prev.alphabet.gamesPlayed + 1,
  //           lastPlayed: new Date().toISOString()
  //         }
  //       };
  //       newStats.totalGamesPlayed = calculateTotalGames(newStats);
  //       return newStats;
  //     });
  //   }
  // };

  const updateMathStats = async (score) => {
    try {
      const stats = {
        highScore: Math.max(gameStats.math.highScore, score),
        gamesPlayed: gameStats.math.gamesPlayed + 1,
        lastPlayed: new Date().toISOString()
      };
      const updatedStats = await gameService.updateGameStats('math', stats);
      setGameStats(updatedStats);
    } catch (error) {
      setGameStats(prev => {
        const newStats = {
          ...prev,
          math: {
            highScore: Math.max(prev.math.highScore, score),
            gamesPlayed: prev.math.gamesPlayed + 1,
            lastPlayed: new Date().toISOString()
          }
        };
        newStats.totalGamesPlayed = calculateTotalGames(newStats);
        return newStats;
      });
    }
  };

  const updateWordStats = async (score) => {
    try {
      const stats = {
        highScore: Math.max(gameStats.word.highScore, score),
        gamesPlayed: gameStats.word.gamesPlayed + 1,
        lastPlayed: new Date().toISOString()
      };
      const updatedStats = await gameService.updateGameStats('word', stats);
      setGameStats(updatedStats);
    } catch (error) {
      setGameStats(prev => {
        const newStats = {
          ...prev,
          word: {
            highScore: Math.max(prev.word.highScore, score),
            gamesPlayed: prev.word.gamesPlayed + 1,
            lastPlayed: new Date().toISOString()
          }
        };
        newStats.totalGamesPlayed = calculateTotalGames(newStats);
        return newStats;
      });
    }
  };

  const updateScienceStats = async (score) => {
    try {
      const stats = {
        highScore: Math.max(gameStats.science.highScore, score),
        gamesPlayed: gameStats.science.gamesPlayed + 1,
        lastPlayed: new Date().toISOString()
      };
      const updatedStats = await gameService.updateGameStats('science', stats);
      setGameStats(updatedStats);
    } catch (error) {
      setGameStats(prev => {
        const newStats = {
          ...prev,
          science: {
            highScore: Math.max(prev.science.highScore, score),
            gamesPlayed: prev.science.gamesPlayed + 1,
            lastPlayed: new Date().toISOString()
          }
        };
        newStats.totalGamesPlayed = calculateTotalGames(newStats);
        return newStats;
      });
    }
  };

  const updateGeographyStats = async (score) => {
    try {
      const stats = {
        highScore: Math.max(gameStats.geography.highScore, score),
        gamesPlayed: gameStats.geography.gamesPlayed + 1,
        lastPlayed: new Date().toISOString()
      };
      const updatedStats = await gameService.updateGameStats('geography', stats);
      setGameStats(updatedStats);
    } catch (error) {
      setGameStats(prev => {
        const newStats = {
          ...prev,
          geography: {
            highScore: Math.max(prev.geography.highScore, score),
            gamesPlayed: prev.geography.gamesPlayed + 1,
            lastPlayed: new Date().toISOString()
          }
        };
        newStats.totalGamesPlayed = calculateTotalGames(newStats);
        return newStats;
      });
    }
  };

  const updateMathPuzzleStats = async (score, puzzlesSolved) => {
    try {
      const stats = {
        highScore: Math.max(gameStats.mathPuzzle.highScore, score),
        gamesPlayed: gameStats.mathPuzzle.gamesPlayed + 1,
        lastPlayed: new Date().toISOString(),
        puzzlesSolved: Math.max(gameStats.mathPuzzle.puzzlesSolved, puzzlesSolved)
      };
      const updatedStats = await gameService.updateGameStats('mathPuzzle', stats);
      setGameStats(updatedStats);
    } catch (error) {
      setGameStats(prev => {
        const newStats = {
          ...prev,
          mathPuzzle: {
            highScore: Math.max(prev.mathPuzzle.highScore, score),
            gamesPlayed: prev.mathPuzzle.gamesPlayed + 1,
            lastPlayed: new Date().toISOString(),
            puzzlesSolved: Math.max(prev.mathPuzzle.puzzlesSolved, puzzlesSolved)
          }
        };
        newStats.totalGamesPlayed = calculateTotalGames(newStats);
        return newStats;
      });
    }
  };

  const value = {
    gameStats,
    updateEmojiStats,
    // updateMemoryStats,
    // updateAlphabetStats,
    updateMathStats,
    updateWordStats,
    updateScienceStats,
    updateGeographyStats,
    updateMathPuzzleStats
  };

  return (
    <GameStatsContext.Provider value={value}>
      {children}
    </GameStatsContext.Provider>
  );
};
