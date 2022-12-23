import axios from "axios";
import authService from "../auth/authService";

const API_URL = "http://localhost:8000/api/events/";

// Create new event
const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, eventData, config);

  return response.data;
};

// Get user events
const getallEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/all", config);

  return response.data;
};

// Delete user event
const deleteEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + eventId, config);

  return response.data;
};

// Get Event By ID

const getEventById = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/" + eventId, config);
  return response.data;
};

// update user event
const updateEvent = async (event, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //const response = await axios.delete(API_URL + "/update", config);

  const response = await axios({
    method: "put",
    url: API_URL + "/update",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: event,
  });

  return response.data;
};

const approveUserToEvent = async (userId, eventId, token) => {
  const response = await axios({
    method: "post",
    url: API_URL + "/approveUser",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId: userId,
      eventId: eventId,
    },
  });

  return response.data;
};

const getAppliedUsersForEvent = (event, token) => {
  return Promise.all(
    event.usersApplied.map((userId) => {
      return authService.getUserDetails(userId, token).then((user) => user);
    })
  );
};

const getApprovedUsersForEvent = (event, token) => {
  return Promise.all(
    event.usersApproved.map((userId) => {
      return authService.getUserDetails(userId, token).then((user) => user);
    })
  );
};

const eventService = {
  createEvent,
  getallEvents,
  deleteEvent,
  getAppliedUsersForEvent,
  updateEvent,
  getEventById,
  getApprovedUsersForEvent,
  approveUserToEvent,
};

export default eventService;
