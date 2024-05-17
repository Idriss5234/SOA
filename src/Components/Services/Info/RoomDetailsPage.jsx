import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./RoomDetailsPage.css"
function RoomDetailsPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/rooms/${id}`);
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
        <h2>{room.name}</h2>
        <p>Location: {room.location}</p>
        <p>Price per Hour: {room.price_per_hour} MAD/hour</p>
        <p>Owned by: {room.owner}</p>
        <p>Size: {room.size}</p>
        <p>Capacity: {room.capacity}</p>
        <p>Description: {room.description}</p>
        <button>Reserve</button> 
      </div>
      <div className="room-image">
        <img src={room.photos} alt={room.name} />
      </div>
    </div>
  );
}

export default RoomDetailsPage;
