// server.js
const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { getRoomsAsync } = require("./Controllers/GetRooms");
const { addRoomsAsync } = require("./Controllers/AddRooms");
const { getRoomById } = require("./Controllers/getRoomById");

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection URI
const uri = "mongodb+srv://idkr5234:DSos7I5Pail1TuJe@soa.o9omsdr.mongodb.net/SOA?retryWrites=true&w=majority";

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

// Routes
app.use('/', require('./routes/authRoutes'));

// Get rooms
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await getRoomsAsync();
    res.json(rooms);
  } catch (error) {
    console.error("Error retrieving rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a room
app.post("/api/rooms", async (req, res) => {
  try {
    await addRoomsAsync(req.body);
    res.json({ message: "Room added successfully" });
  } catch (error) {
    console.error("Error adding room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get room by id
app.get("/api/rooms/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await getRoomById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error("Error fetching room details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
