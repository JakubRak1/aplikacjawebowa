import React, { useState } from "react";
import './static/styles/mainStyles.css';
import LogoImage from "./components/LogoImg";
import EmailForm from "./components/EmailForm";
import CarsDisplay from "./components/CarsDisplay";
import SearchBar from "./components/SearchBar";
import CarPart from "./components/CarPart";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };


  return (
    <div className="App">
      <header className="App-header">
        <LogoImage />
      </header>
      <main>
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="car-gallery">
          {searchTerm ? <CarPart searchTerm={searchTerm} /> : <CarsDisplay />}
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