import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Elements/Navbar/Navbar";
import Home from "./Components/Services/Home/home";
import Post from "./Components/Services/Publier/publier";
import Book from "./Components/Services/Réserver/Réserver";
import Reservations from "./Components/Services/Mes Réservations/mes_res";
import Bottom from "./Components/Elements/BottomBar/Bottom";
import "./App.css";
import SearchContext from "./Components/Elements/Contexts/SearchContext";

function App() {
  const [SearchQuery, setSearchQuery] = React.useState("");
  return (
    <SearchContext.Provider value={{ SearchQuery, setSearchQuery }}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Post" element={<Post />} />
            <Route path="/Book" element={<Book />} />
            <Route path="/Reservations" element={<Reservations />} />
          </Routes>
          <Bottom />
        </div>
      </Router>
    </SearchContext.Provider>
  );
}

export default App;
