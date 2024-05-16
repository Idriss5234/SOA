import React, { useState } from "react";
import "./publier.css";
import { firebaseConfig } from "../../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function Publier() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [size, setSize] = useState("");
  const [capacity, setCapacity] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  // Initialize Firebase app
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  // Get a reference to the storage service
  const storage = firebase.storage();

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

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handlePublish = async () => {
    try {
      // Check if photoFile is not null
      if (!photoFile) {
        throw new Error("Please select a photo.");
      }

      // Upload photo to Firebase Storage
      const photoRef = storage.ref().child(`photos/${photoFile.name}`);
      await photoRef.put(photoFile);
      const photoUrl = await photoRef.getDownloadURL();

      // Store metadata with photo URL in MongoDB
      const response = await fetch("http://localhost:3001/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price_per_hour: price,
          location: localisation,
          size: size,
          capacity: capacity,
          photos: photoUrl,
          // Add other fields as needed
        }),
      });

      if (response.ok) {
        alert("Room added successfully");
      } else {
        throw new Error("Failed to publish room");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
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
          type="file"
          accept="image/*"
          className="fieldss"
          onChange={handlePhotoChange}
        />
      </div>
      <button className="Publish" onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
}

export default Publier;
