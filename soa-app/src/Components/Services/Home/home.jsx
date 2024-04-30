// Home.js
import React, { useState, useEffect } from "react";
import Card from "../../Elements/Card/Card";
import Bottom from "../../Elements/BottomBar/Bottom";
import "./home.css";

function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch room data from the API
    fetch("http://localhost:3001/api/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  return (
    <div className="bodyy">
      <div className="home">
        <h1>Home</h1>
        <div className="cards">
          {/* Check if rooms is an array before using map */}
          {Array.isArray(rooms) &&
            rooms.map((room) => <Card key={room._id} room={room} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
