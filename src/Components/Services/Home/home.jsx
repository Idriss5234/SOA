import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../Elements/Card/Card";
import "./home.css";
import {useContext} from "react"
import { UserContext } from "../../Services/Auth/context/userContext"

function Home() {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const {user} = useContext(UserContext)

  useEffect(() => {
    // Fetch room data from the API
    fetch("http://localhost:3001/api/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  console.log("Rooms:", rooms);

  // Function to handle search
  const handleSearch = () => {
    // Filter rooms based on searchQuery
    const filteredRooms = rooms.filter(
      (room) =>
        room.name && room.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the state with filtered rooms
    setRooms(filteredRooms);
  };

  // Function to handle page refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  return (<>
    <div>{!!user && (<h1>Welcome {user.name} !</h1>)}</div>
    <div className="bodyy">
      <div className="home">
        <h1>
          <div className="searchbar">
            <input
              className="search-input"
              variant="outlined"
              fullWidth
              label="Search"
              placeholder="  Search..."
              value={searchQuery} // Bind input value to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
            <button
              type="button"
              className="search-button"
              onClick={handleSearch} // Call handleSearch function on button click
            >
              Search
            </button>
            {/* Add the refresh button */}
            <button className="search-button" onClick={handleRefresh}>
              Refresh
            </button>
          </div>
        </h1>

        <div className="cards">
          {/* Render rooms */}
          {Array.isArray(rooms) &&
            rooms.map((room) => <Card key={room._id} room={room} />)}
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
