const { MongoClient ,ObjectId} = require("mongodb");

const uri =
  "mongodb+srv://idkr5234:DSos7I5Pail1TuJe@soa.o9omsdr.mongodb.net/?retryWrites=true&w=majority&appName=SOA";
const dbName = "SOA";
const collectionName = "salle";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function getRoomById(id) {
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  const room = await collection.findOne({ _id:new ObjectId(id) }); // Use ObjectId to query by ID
  return room;
}
module.exports = { getRoomById };