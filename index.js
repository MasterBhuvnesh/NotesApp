const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const app = express();

// Enable CORS for specific origins
app.use(cors({
  origin: ["https://masterbhuvnesh.github.io", "http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true // Optional, depending on your use case
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://bhuvneshverma29042005:Verma29042005$@notes.azp7xvl.mongodb.net/");

// GET ALL USER DATA
app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// RUN THE SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
