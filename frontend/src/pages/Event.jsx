import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import axios from "axios";
import Button from "react-bootstrap/Button";
import authService from "../features/auth/authService";
import eventService from "../features/events/eventService";

function Event() {
  // const location = useLocation();

  const { id } = useParams();

  const [Organiser, SetOrganiser] = useState("");
  const [OrganiserEmail, SetOrganiserEmail] = useState("");
  const [self, SetSelf] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [applied, SetApplied] = useState(false);
  const [approved, SetApproved] = useState(false);
  const [event, SetEvent] = useState({});
  const API_URL = "http://localhost:8000/api/";
  const token = user.token;
  const [appliedUsers, SetAppliedUsers] = useState([]);
  const [approvedUsers, SetApprovedUsers] = useState([]);
  useEffect(() => {
    eventService.getEventById(id, token).then((res) => {
      SetEvent(res);
    });
    if (Object.keys(event).length === 0) return;
  }, []);

  useEffect(() => {
    authService.getUserDetails(event.createdBy, token).then((eventCreator) => {
      eventCreator && SetOrganiser(eventCreator.name);
      eventCreator && SetOrganiserEmail(eventCreator.email);
    });
    if (Object.keys(event).length === 0) return;
    eventService.getAppliedUsersForEvent(event, token).then((e) => {
      SetAppliedUsers(e);
    });
    eventService.getApprovedUsersForEvent(event, token).then((e) => {
      SetApprovedUsers(e);
    });
  }, [event]);

  useEffect(() => {
    if (Object.keys(event).length === 0) return;

    if (event.usersApplied.includes(user._id)) {
      SetApplied(true);
    }
    if (!approved && event.usersApproved.includes(user._id)) {
      SetApproved(true);
    }

    if (!self && event.createdBy == user._id) SetSelf(true);

    if (Organiser === "" || OrganiserEmail === "") {
      authService
        .getUserDetails(event.createdBy, token)
        .then((eventCreator) => {
          eventCreator && SetOrganiser(eventCreator.name);
          eventCreator && SetOrganiserEmail(eventCreator.email);
        });
    }
  });

  const joinEvent = () => {
    if (event.usersApproved.length === event.playersLimit) {
      toast("Sorry Limit Exeeded");
      return;
    }
    const token = user.token;

    axios({
      method: "put",
      url: API_URL + `events/addUser/${event._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: user._id,
      },
    }).then((res) => {
      if (res.status == 200) {
        SetApplied(true);
      }
      window.location.reload();
    });
  };

  const approveUser = (e) => {
    //  e.preventDefault();

    if (event.usersApproved.length === event.playersLimit) {
      toast.error("Limit Exceeded");

      return;
    }

    eventService
      .approveUserToEvent(appliedUsers[e.target.value]._id, event._id, token)
      .then((e) => {
        SetEvent(e);
        window.location.reload();
      });
  };

  if (Object.keys(event).length === 0) {
    // event = location.state.event;
    return <h1>No Events</h1>;
  }
  return (
    <div className="goal">
      <div>{new Date(event.timeOfEvent).toLocaleString("en-GB")}</div>
      <h2>{event.title || "No Event"}</h2>
      <p> {self ? "-Hosted By you " : "others event"}</p>
      <p> {event.description}</p>
      <p>Members Joined :{event.usersApproved.length}</p>
      <p>Members Limit : {event.playersLimit}</p>
      <p>Basic Requirements : {event.requirements}</p>
      <p>Organiser : {Organiser}</p> <p>Organiser Email : {OrganiserEmail}</p>
      {self ? (
        <>
          <div>
            <h4>List of Applied People</h4>
            {appliedUsers.length > 0
              ? appliedUsers.map((user, id) => (
                  <div
                    key={id}
                    className="d-flex justify-content-around  mx-auto my-3 w-60"
                  >
                    <p>Name:{user.name}</p>
                    <p className=" pl-2">Email : {user.email}</p>
                    <Button varient="primary" value={id} onClick={approveUser}>
                      Approve
                    </Button>
                  </div>
                ))
              : null}
          </div>

          <div>
            <h4>List of Approved People</h4>
            {approvedUsers.length > 0
              ? approvedUsers.map((user, id) => (
                  <div
                    key={id}
                    className="d-flex justify-content-around  mx-auto my-3 w-60"
                  >
                    <p>Name:{user.name}</p>
                    <p className=" pl-2">Email : {user.email}</p>
                    <Button varient="primary" value={id}>
                      Already Approved
                    </Button>
                  </div>
                ))
              : null}
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center">
          <h4>
            Join the Event ?
            <Button
              variant={approved ? "light" : applied ? "success" : "primary"}
              disabled={approved}
              onClick={joinEvent}
            >
              {approved
                ? "Approved By Organiser"
                : applied
                ? "Already Applied"
                : "Apply now"}
            </Button>
          </h4>
        </div>
      )}
    </div>
  );
}

export default Event;
