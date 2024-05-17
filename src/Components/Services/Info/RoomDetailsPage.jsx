import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./RoomDetailsPage.css";
function RoomDetailsPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/rooms/${id}`
        );
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
    fetchRoomDetails();
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="room-details-container">
      <div className="room-info">
        <h2 id="titre">{room.name}</h2>
        <span id="titre">Location: </span>
        <span id="valuess">{room.location}</span>
        <span id="titre">Price per Hour: </span>
        <span id="valuess">{room.price_per_hour} MAD/hour</span>
        <span id="titre">Owned by: </span>
        <span id="valuess">{room.owner}</span>
        <span id="titre">Size: </span>
        <span id="valuess">{room.size}</span>
        <span id="titre">Capacity: </span>
        <span id="valuess">{room.capacity}</span>
        <span id="titre">Description: </span>
        <span id="valuess">{room.description}</span>
        <br />
      </div>

      <div className="room-image">
        <img src={room.photos} alt={room.name} />
        <button id="reservee">Reserver</button>
      </div>
    </div>
  );
}

export default RoomDetailsPage;
