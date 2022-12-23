const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

// Get all Goals
// Private Route
// @route GET/api/events
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

// get a Event by Id
// Private Route
// @route POST/api/events
const getEventById = asyncHandler(async (req, res) => {
  if (!req.params.id) throw new Error("Invalid Id for an Event");
  const event = await Event.findById(req.params.id);

  res.status(200).json(event);
});

const approveUserToEvent = asyncHandler(async (req, res) => {
  if (!req.body.userId || !req.body.eventId) {
    res.status(400);
    throw new Error("Event is not Proper ");
  }

  let event = await Event.findById(req.body.eventId);

  if (!event.usersApproved.includes(req.body.userId))
    event.usersApproved.push(req.body.userId);
  let index = event.usersApplied.indexOf(req.body.userId);
  if (index > -1) {
    event.usersApplied.splice(index, 1);
  }

  const UpdatedEvent = await Event.findByIdAndUpdate(req.body.eventId, event, {
    new: false,
  });

  res.status(200).json(UpdatedEvent);
});

// Create a Event
// Private Route
// @route POST/api/events
const createEvent = asyncHandler(async (req, res) => {
  if (
    !req.body.title ||
    !req.body.timeOfEvent ||
    !req.body.playersLimit ||
    !req.body.requirements ||
    !req.body.description
  ) {
    res.status(400);
    throw new Error("Event is not Proper ");
  }

  const event = await Event.create({
    title: req.body.title,
    timeOfEvent: req.body.timeOfEvent,
    playersLimit: req.body.playersLimit,
    requirements: req.body.requirements,
    createdBy: req.user.id,
    description: req.body.description,
  });

  res.status(200).json(event);
});

// Update  a Event
// Private Route
// @route PUT/api/events
const addUserToEvent = asyncHandler(async (req, res) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error("Event Not Found");
  }
  if (!req.body.userId) {
    res.status(400);
    throw new Error("User Not Found");
  }

  if (!event.usersApplied.includes(req.body.userId))
    event.usersApplied.push(req.body.userId);
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, event, {
    new: false,
  });
  res.status(200).json(updatedEvent);
});

// Update  a Event
// Private Route
// @route PUT/api/events
const updateEvent = asyncHandler(async (req, res) => {
  if (
    !req.body.title ||
    !req.body.timeOfEvent ||
    !req.body.playersLimit ||
    !req.body.requirements ||
    !req.body.description ||
    !req.body.usersApplied ||
    !req.body.usersApproved
  ) {
    res.status(400);
    throw new Error("Event is not Proper ");
  }

  //const updatedEvent = await Event.findByIdAndUpdate()
  res.status(200).json({ message: `Update an  Event  ${req.params.id}` });
});

// Delete a Goal
// Private Route
// @route DELETE/api/events
const deleteEvent = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted  an  Event  ${req.params.id}` });
});

//Module Exports
module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  addUserToEvent,
  approveUserToEvent,
};
