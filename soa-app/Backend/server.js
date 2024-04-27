// server.js
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const uri =
  "mongodb+srv://idkr5234:DSos7I5Pail1TuJe@soa.o9omsdr.mongodb.net/?retryWrites=true&w=majority&appName=SOA";

// Database Name
const dbName = "SOA";
const collectionName = "salle"; // Name of your collection

// Connect to MongoDB
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongo() {
  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToMongo();

// getRooms function  (Idriss)
const { getRooms } = require("./controllers/GetRooms");

app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await getRooms();
    console.log(rooms);
    res.json(rooms);
  } catch (error) {
    console.error("Error retrieving rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//

// Add a room to the database (Idriss)
app.post("/api/rooms", async (req, res) => {
  try {
    const room = req.body;
    const result = await client
      .db(dbName)
      .collection(collectionName)
      .insertOne(room);
    res.json(result);
  } catch (error) {
    console.error("Error adding room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
