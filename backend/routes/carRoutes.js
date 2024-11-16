const express = require("express");
const { getCars, createCar, deleteCar } = require("../controllers/carController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticateUser);

router.get("/", getCars);
router.post("/", createCar);
router.delete("/:id", deleteCar);

module.exports = router;
