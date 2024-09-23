const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/type");
const ImgModel = require("./models/Image");
const app = express();

app.use(
  cors({
    origin: ["https://masterbhuvnesh.github.io", "http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://bhuvneshverma29042005:Verma29042005$@notes.azp7xvl.mongodb.net/sempai",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Retrieve all documents
app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.get("/image", (req, res) => {
  ImgModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// Delete a specific name from a document by type and name
app.delete("/delete-name", (req, res) => {
  const { type, name } = req.body;

  UserModel.updateOne({ type }, { $pull: { names: { name } } })
    .then(() => res.json({ message: "Name deleted successfully" }))
    .catch((err) => res.status(400).json(err));
});

// Update the status of a specific name in a document by type and name (only status)
app.put("/update-status", (req, res) => {
  const { type, name, newStatus } = req.body;

  if (!newStatus) {
    return res.status(400).json({ message: "Status is required" });
  }

  UserModel.updateOne(
    { type, "names.name": name },
    { $set: { "names.$.status": newStatus } }
  )
    .then(() => res.json({ message: "Status updated successfully" }))
    .catch((err) => res.status(400).json(err));
});

//  Update the background IMG
app.put("/update-img", (req, res) => {
  const { pic } = req.body;
  if (!pic) {
    return res.status(400).json({ message: "New pic URL is required" });
  }
  ImgModel.updateOne(
    {name:"bg"},                  
    { $set: { pics: pic } } 
  )
    .then(() => res.json({ message: "Image updated successfully" }))
    .catch((err) => res.status(400).json(err));
});


// Add a new name and status to a document (name and status required)
app.post("/add-name", (req, res) => {
  const { type, name, status } = req.body;

  if (!name || !status) {
    return res
      .status(400)
      .json({ message: "Both name and status are required" });
  }

  UserModel.updateOne({ type }, { $push: { names: { name, status } } })
    .then(() => res.json({ message: "Name and status added successfully" }))
    .catch((err) => res.status(400).json(err));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
