import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const updateGameStats = async (gameType, stats) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_URL}/game-stats/${gameType}`,
      stats,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating game stats:', error);
    throw error;
  }
};

export const gameService = {
  updateGameStats
};