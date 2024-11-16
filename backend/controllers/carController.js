const { db, bucket } = require("../utils/firebase");

// Fetch all cars for logged-in user
const getCars = async (req, res) => {
  const userId = req.user.uid;
  const carsRef = db.collection("users").doc(userId).collection("cars");
  const snapshot = await carsRef.get();
  const cars = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.status(200).json(cars);
};

// Create a new car
const createCar = async (req, res) => {
  const { title, description, tags } = req.body;
  const userId = req.user.uid;

  try {
    const carRef = await db.collection("users").doc(userId).collection("cars").add({
      title,
      description,
      tags,
      images: [], // Handle images later
    });
    res.status(201).json({ id: carRef.id, message: "Car created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a car
const deleteCar = async (req, res) => {
  const userId = req.user.uid;
  const carId = req.params.id;

  try {
    await db.collection("users").doc(userId).collection("cars").doc(carId).delete();
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCars, createCar, deleteCar };
