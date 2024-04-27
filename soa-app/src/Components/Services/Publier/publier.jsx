import React from "react";
import "./publier.css";
import { useState } from "react";

function Publier() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [size, setSize] = useState("");
  const [capacity, setCapacity] = useState("");
  const [photos, setPhotos] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleLocalisation = (e) => {
    setLocalisation(e.target.value);
  };
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handleCapacity = (e) => {
    setCapacity(e.target.value);
  };
  const handlePhotos = (e) => {
    setPhotos(e.target.value);
  };
  const handlePublish = () => {
    console.log("click");
    fetch("http://localhost:3001/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        Description: description,
        price_per_hour: price,
        Location: localisation,
        size: size,
        capacity: capacity,
        photos: photos,
        //add owner
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <h1>Publier</h1>
      <div className="userinput">
        <input
          type="text"
          placeholder=" Name..."
          className="fieldss"
          onChange={handleName}
        />
        <input
          type="text"
          placeholder="Description..."
          className="fieldss"
          onChange={handleDescription}
        />
        <input
          type="text"
          placeholder="Price per hour..."
          className="fieldss"
          onChange={handlePrice}
        />
        <input
          type="text"
          placeholder="Localisation..."
          className="fieldss"
          onChange={handleLocalisation}
        />
        <input
          type="text"
          placeholder="Size in m2..."
          className="fieldss"
          onChange={handleSize}
        />
        <input
          type="text"
          placeholder="Max capacity..."
          className="fieldss"
          onChange={handleCapacity}
        />
        <input
          type="text"
          placeholder="Photos..."
          className="fieldss"
          onChange={handlePhotos}
        />
      </div>
      <button className="Publish" onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
}
export default Publier;
