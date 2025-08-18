import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import {Outlet} from "react-router-dom";
import { GameStatsProvider } from './context/GameStatsContext';
import Root from "./miniproject/Root";
import Home from "./miniproject/Home.jsx";
import Login from "./miniproject/Login.jsx";
import Activities from "./miniproject/Activities.jsx";
import Progress from "./miniproject/Progress.jsx";
import Rewards from "./miniproject/Rewards.jsx";
import Resources from "./miniproject/Resources.jsx";
import SignUp from "./miniproject/SignUp.jsx";

import EmojiGame from "./miniproject/EmojiGame.jsx";
import ProtectedRoute from "./miniproject/ProtectedRoute.jsx";


import MathGame from "./miniproject/MathGame.jsx";
import WordScrambleGame from "./miniproject/WordScrambleGame.jsx";
import GeographyGame from "./miniproject/GeographyGame.jsx";
import MathPuzzleGame from "./miniproject/MathPuzzleGame.jsx";
import ScienceQuizGame from "./miniproject/ScienceQuizGame.jsx";
import AlphabetGame from "./miniproject/alphabets.jsx";
import ErrorBoundary from "./miniproject/ErrorBoundary.jsx";
import AnimalSoundsGame from "./miniproject/AnimalSoundsGame.jsx";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorBoundary />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="activities" element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          <Route index element={<Activities />} />
          <Route path="emoji" element={<EmojiGame />} />
          <Route path="animalsounds" element={<AnimalSoundsGame />} />
         
         
          <Route path="mathgame" element={<MathGame />} />
          <Route path="wordscramble" element={<WordScrambleGame />} />
          <Route path="geography" element={<GeographyGame />} />
          <Route path="mathpuzzle" element={<MathPuzzleGame />} />
          <Route path="sciencequiz" element={<ScienceQuizGame />} />
          {/* <Route path="alphabets" element={<AlphabetGame/>} /> */}
        </Route>
        <Route path="progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
        <Route path="resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
       
      </Route>
    )
  );

  return(
<>
<GameStatsProvider>
  <RouterProvider router={router} />
</GameStatsProvider>
</>
  ) 
}

export default App;
