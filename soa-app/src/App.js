import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Elements/Navbar/Navbar";
import Home from "./Components/Services/Home/home";
import Post from "./Components/Services/Publier/publier";
import Book from "./Components/Services/Réserver/Réserver";
import Reservations from "./Components/Services/Mes Réservations/mes_res";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/Reservations" element={<Reservations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
