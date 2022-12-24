import React from "react";
import { Link } from "react-router-dom";

function EventItem({ event }) {
  return (
    <Link to={`/event/${event._id}`} state={{ event: event }}>
      <div className="goal">
        <div>{new Date(event.timeOfEvent).toLocaleString("en-GB")}</div>
        <h2>{event.title}</h2>
      </div>
    </Link>
  );
}

export default EventItem;
