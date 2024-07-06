const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const app = express();

// Enable CORS for specific origins
app.use(
  cors({
    origin: [
      "https://masterbhuvnesh.github.io",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://bhuvneshverma29042005:Verma29042005$@notes.azp7xvl.mongodb.net/notes",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// GET ALL USER DATA
app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// ADD NEW NAME TO THE SELECTED TYPE
app.post("/add", (req, res) => {
  const { type, name } = req.body;

  UserModel.findOneAndUpdate(
    { type: type },
    { $push: { names: name } },
    { new: true }
  )
    .then(() => {
      UserModel.find({})
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

// RUN THE SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
