import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for Navbar styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="links">
        <Link to="./Home" className="nav-link home">
          Home
        </Link>
        <Link to="/Post" className="nav-link">
          Post
        </Link>
        <Link to="/Book" className="nav-link">
          Book
        </Link>
        <Link to="/Reservations" className="nav-link">
          My Reservations
        </Link>
      </div>
      <div className="searchbar">
        <input
          className="search-input"
          variant="outlined"
          fullWidth
          label="Search"
          placeholder="  Search..."
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
