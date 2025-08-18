import React from 'react';
import homepageImage from '../assets/homepage.jpg';

function Home() {
  return (
    <div 
      className="flex-1 bg-cover bg-center"
      style={{
        backgroundImage: `url(${homepageImage})`,
        backgroundSize: 'cover',  // Ensures the image covers the entire div
        backgroundPosition: 'center',  // Centers the image
        backgroundRepeat: 'no-repeat'  // Prevents tiling
      }}
    >
      <h1 
        className="text-center pt-52 text-blue-600 font-serif"
      >
        Let's Learn And Laugh Together!
      </h1>
    </div>
  );
}

export default Home;
