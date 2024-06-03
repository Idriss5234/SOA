import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RoomDetailsPage.css";
function RoomDetailsPage() {
  const user = useContext(UserContext);
  console.log(user);
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reservationMessage, setReservationMessage] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts/${id}`);
        setRoom(response.data.post);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
    fetchRoomDetails();
  }, [id]);

  if (!room) {
    return <div>Loading...</div>;
  }

  const allPhotos = [room.photo1, room.photo2].flat();

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % allPhotos.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex = currentImageIndex === 0 ? allPhotos.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
  };

  const handleReservation = async () => {
    if (!startDate || !endDate) {
      setReservationMessage("Please select both start and end dates.");
      return;
    }
    try {
      await axios.post(`http://localhost:3001/api/Reserve`, {
        post: room._id,
        creator: user.user.user._id,
        dateStart: startDate.toISOString(),
        dateEnd: endDate.toISOString()
      });
      setReservationMessage("Reservation successful!");
    } catch (error) {
      console.error("Error making reservation:", error);
      setReservationMessage("Please chose another date range.");
    }
  };

  return (
    <div className="room-details-container">
      <div className="room-info">
        <h2 id="titre">{room.title}</h2>
        <div>
          <span id="titre">Location: </span>
          <span id="valuess">{room.location}</span>
        </div>
        <div>
          <span id="titre">Price per Hour: </span>
          <span id="valuess">{room.price_per_hour} MAD/hour</span>
        </div>
        <div>
          <span id="titre">Owned by: </span>
          <span id="valuess">{room.owner}</span>
        </div>
        <div>
          <span id="titre">Size: </span>
          <span id="valuess">{room.size}</span>
        </div>
        <div>
          <span id="titre">Capacity: </span>
          <span id="valuess">{room.capacity}</span>
        </div>
        <div>
          <span id="titre">Description: </span>
          <span id="valuess">{room.description}</span>
        </div>
        <div>
          <span id="titre">Services: </span>
          {room.services.map((service, index) => (
            <div key={index}>
              <span>
                {service.name} : {service.price} MAD
              </span>
            </div>
          ))}
        </div>
        <br />
      </div>

      <div className="room-image">
        <img src={allPhotos[currentImageIndex]} alt={room.name} />
        {allPhotos.length > 1 && (
          <>
            <button id="prev-image" onClick={handlePrevImage}>
              &lt;
            </button>
            <button id="next-image" onClick={handleNextImage}>
              &gt;
            </button>
          </>
        )}<Calendar />
      </div> 
    </div>
  );
}

export default RoomDetailsPage;
