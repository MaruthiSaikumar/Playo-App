import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EventItem from "../components/EventItem";
import Spinner from "../components/Spinner";
import { getEvents, reset } from "../features/events/eventSlice";

function AppliedEvents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  );

  const approvedEvents =
    events && events.filter((event) => event.usersApplied.includes(user._id));

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
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
        {approvedEvents.length > 0 ? (
          <div className="goals">
            {approvedEvents.map((event) => (
              <EventItem key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <h3>You have no Applied Events </h3>
        )}
      </section>
    </>
  );
}

export default AppliedEvents;
