// Navbar.jsx
import React, { useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for Navbar styling
import SearchContext from "../Contexts/SearchContext";
import image from "../../../logosoa.png";

function Navbar() {
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };
  return (
    <nav className="navbar">
      <div className="links">
        <Link to="./Home" className="nav-link" id="home">
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
      <div>
        <img src={image} height={50} width={100} alt="" />
      </div>
    </nav>
  );
}

export default Navbar;
