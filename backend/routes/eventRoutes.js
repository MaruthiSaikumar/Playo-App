const express = require("express");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  addUserToEvent,
  approveUserToEvent,
} = require("../controllers/eventController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/all", protect, getEvents);
router.get("/:id", protect, getEventById);
router.post("/", protect, createEvent);
router.put("/update", protect, updateEvent);
router.put("/addUser/:id", protect, addUserToEvent);
router.delete("/:id", protect, deleteEvent);
router.post("/approveUser", protect, approveUserToEvent);

// router.route("/").get(getEvents);

// router.route("/").post(createEvent);
// router.route("/:id").put(updateEvent).delete(deleteEvent);

module.exports = router;
