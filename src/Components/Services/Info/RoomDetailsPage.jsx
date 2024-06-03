import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./RoomDetailsPage.css";
import { Link } from "react-router-dom";

function RoomDetailsPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
  const allPhotos = [room.photos, room.photos2].flat();

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % allPhotos.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex =
      currentImageIndex === 0 ? allPhotos.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
  };

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
        <span id="titre">Services: </span>
        {room.services.map((service, index) => (
          <div key={index}>
            <span>
              {service.name} : {service.price} MAD
            </span>
          </div>
        ))}
        <br />
      </div>

      <div className="room-image">
        <img src={allPhotos[currentImageIndex]} alt={room.name} />
        {allPhotos.length > 1 && ( // Only show navigation if multiple images
          <>
            <button id="prev-image" onClick={handlePrevImage}>
              &lt;
            </button>
            <button id="next-image" onClick={handleNextImage}>
              &gt;
            </button>
          </>
        )}
        <div>
          <Link to={`/book/${room._id}`}>
            <button className="reserever-button">Réserver</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailsPage;
