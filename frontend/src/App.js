import React from "react";
import './static/styles/mainStyles.css';
import LogoImage from "./components/LogoImg";
import EmailForm from "./components/EmailForm";
import CarsDisplay from "./components/CarsDisplay";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LogoImage />
      </header>
      <main>
        <div className="car-gallery">
          <CarsDisplay />
        </div>
        <div>
          <h1>Please leave us some feedback</h1>
          <EmailForm />
        </div>
      </main>
    </div>
  );
}

export default App;