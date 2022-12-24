import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EventItem from "../components/EventItem";
import Spinner from "../components/Spinner";
import { getEvents, reset } from "../features/events/eventSlice";
import { use } from "express/lib/application";

function ApprovedEvents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  );

  const myEvents =
    events && events.filter((event) => event.createdBy === user._id);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }
    if (!user._id && !user.token) {
      navigate("/login");
    }

    dispatch(getEvents());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <p>Your Events </p>

      <section className="content">
        {myEvents.length > 0 ? (
          <div className="goals">
            {myEvents.map((event) => (
              <EventItem key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <>
            <h3>You have no Events</h3>
            <button className="btn btn-primary">
              <Link to="/createEvent">Create a Event</Link>
            </button>
          </>
        )}
      </section>
    </>
  );
}

export default ApprovedEvents;
