import React from 'react';
import './static/styles/mainStyles.css';

const carImages = [
  'car1.jpg', // replace with your image filenames
  'car2.jpg',
  'car3.jpg',
  // Add more images as needed
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CarIO</h1>
      </header>
      <main>
        <div className="car-gallery">
          {carImages.map((imageName, index) => (
            <img
              key={index}
              src={`images/${imageName}`} // adjust the path based on your folder structure
              alt={`Old Car ${index + 1}`}
              className="car-image"
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;