const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser")
const authRoute=require("./Routes/AuthRoute")
const postRoute=require("./Routes/PostRoute")
const reserveRoute=require("./Routes/ReservationRoutes")
const cors = require("cors");
const app = express();


mongoose
  .connect("mongodb+srv://ayoub:PqUnOSEwemlds4lC@cluster0.l7iioc4.mongodb.net/SOA?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser : true, 
    useUnifiedTopology : true,
  })
  .then(()=> console.log("MongoDB is connected successfully"))
  .catch((err) => console.error((err)));

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));

app.use(cookieParser());

app.use(express.json());

app.use("/",authRoute);

app.use(postRoute);

app.use(reserveRoute);

