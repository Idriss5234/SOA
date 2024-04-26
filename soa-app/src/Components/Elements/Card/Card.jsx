// Card.js
import React from "react";
import "./Card.css";

function Card({ room }) {
  return (
    <div className="card">
      <img
        src="https://www.dgicommunications.com/wp-content/uploads/2018/03/DSC_2917.jpg"
        alt={room.name} // Assuming your room object has a field named title for the room title
        height={200}
        width={300}
      />
      <div className="card-content">
        <h3>{room.name}</h3>
        <p> {room.Location}</p>{" "}
        {/* Assuming your room object has a field named location */}
        <p>{room.price_per_hour} MAD/hour</p>{" "}
        {/* Assuming your room object has a field named price */}
        <p>Owned by :{room.owner}</p>{" "}
        {/* Assuming your room object has a field named owner */}
        <button>Details</button>
      </div>
    </div>
  );
}

export default Card;
