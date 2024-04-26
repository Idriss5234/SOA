const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri =
  "mongodb+srv://idkr5234:DSos7I5Pail1TuJe@soa.o9omsdr.mongodb.net/?retryWrites=true&w=majority&appName=SOA"; // Change this to your MongoDB URI

// Database Name
const dbName = "SOA";
const collectionName = "users"; // Name of your collection

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB server
async function connectToMongo() {
  try {
    // Connect to the MongoDB client
    await client.connect();

    console.log("Connected to MongoDB");

    // Access a specific database
    const db = client.db(dbName);

    // Perform operations using the database
    // For example, you can insert documents, query data, etc.
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
// Call the function to connect to MongoDB
connectToMongo();
listDatabases(client);

async function getAllUsers() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Find all documents in the collection
    const users = await collection.find({}).toArray();

    console.log("All users:", users);

    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    return [];
  } finally {
    await client.close();
  }
}

// Call the function to retrieve all users
getAllUsers();
