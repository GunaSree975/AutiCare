import React, { useState, useEffect } from "react";

const PatternGame = () => {
  const colors = ["red", "blue"];
  const targetPattern = ["red", "blue", "red", "blue", "red", "blue", "red", "blue", "red", "blue"];

  const [circles, setCircles] = useState([]);

  useEffect(() => {
    initializeCircles();
  }, []);

  const initializeCircles = () => {
    setCircles(new Array(10).fill("red"));
  };

  const toggleColor = (index) => {
    setCircles((prevCircles) =>
      prevCircles.map((color, i) => (i === index ? (color === "red" ? "blue" : "red") : color))
    );
  };

  const checkPattern = () => {
    let score = circles.reduce((acc, color, i) => (color === targetPattern[i] ? acc + 1 : acc), 0);
    alert(`Score: ${score} / 10`);
  };

  const shufflePattern = () => {
    setCircles(circles.map(() => colors[Math.floor(Math.random() * colors.length)]));
  };

  return (
    <div style={{ backgroundColor: "black", height: "100vh", textAlign: "center", paddingTop: "50px" }}>
      {/* Inline CSS */}
      <style>
        {`
          .circle-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
          .circle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: inline-block;
            margin: 5px;
            cursor: pointer;
          }
          #result {
            text-align: center;
            font-size: 20px;
            margin-top: 10px;
            color: white;
          }
          button {
            padding: 15px;
            border-radius: 20%;
            margin: 5px;
            font-size: 16px;
            cursor: pointer;
          }
        `}
      </style>

      <h1 style={{ color: "antiquewhite", marginTop: "50px" }}>Pattern Recognition Game</h1>

      <div className="circle-container">
        {circles.map((color, index) => (
          <div
            key={index}
            className="circle"
            style={{ backgroundColor: color }}
            onClick={() => toggleColor(index)}
          ></div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={checkPattern}>Check Pattern</button>
        <button onClick={shufflePattern}>Shuffle</button>

        <p style={{ color: "white", marginTop: "20px" }}>
          The pattern should be like "Red-Blue-Red-Blue..." <br />
          Tap on the circles to change colors.
        </p>
      </div>
    </div>
  );
};

export default PatternGame;
