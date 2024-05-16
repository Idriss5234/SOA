// server.js
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const { getRoomsAsync } = require("./Controllers/GetRooms");
const { addRoomsAsync } = require("./Controllers/AddRooms");

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const uri =
  "mongodb+srv://idkr5234:DSos7I5Pail1TuJe@soa.o9omsdr.mongodb.net/?retryWrites=true&w=majority&appName=SOA";
const dbName = "SOA";
const collectionName = "salle";

// Connect to MongoDB
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToMongo();

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
