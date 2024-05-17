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
import Register from './Components/Services/Auth/pages/Register';
import Login from './Components/Services/Auth/pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './Components/Services/Auth/context/userContext';
import Dashboard from "./Components/Services/Auth/pages/Dashboard";
import RoomDetailsPage from "./Components/Services/Info/RoomDetailsPage";

// Axios configuration
axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;

function App() {
  const [SearchQuery, setSearchQuery] = React.useState("");

  return (
    <UserContextProvider>
      <SearchContext.Provider value={{ SearchQuery, setSearchQuery }}>
        <Router>
          <div className="App">
            {/* Condition to not display Navbar on Login and Register pages */}
            {window.location.pathname !== '/' && window.location.pathname !== '/register' && (
              <Navbar />
            )}
            <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Post" element={<Post />} />
              <Route path="/Book" element={<Book />} />
              <Route path="/Reservations" element={<Reservations />} />
              <Route path="/rooms/:id" element={<RoomDetailsPage />} />
            </Routes>
            <Bottom />
          </div>
        </Router>
      </SearchContext.Provider>
    </UserContextProvider>
  );
}

export default App;
