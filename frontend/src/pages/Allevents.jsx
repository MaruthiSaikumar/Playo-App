import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EventItem from "../components/EventItem";
import Spinner from "../components/Spinner";
import { getEvents, reset } from "../features/events/eventSlice";
import { useState } from "react";
import { toast } from "react-toastify";

function AllEvents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchtext, SetSearchText] = useState();
  const { user } = useSelector((state) => state.auth);
  const [displayEvents, SetDisplayEvents] = useState(
    useSelector((state) => state.events.events)
  );
  let { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  );

  // const data = events.map((event) => event.title);
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

  useEffect(() => {
    dispatch(getEvents());

    SetDisplayEvents(events);
  }, []);

  useEffect(() => {
    SetDisplayEvents(events);
  }, [events]);

  useEffect(() => {
    if (!searchtext) return;
    let filteredEvents = events.filter((event) =>
      Boolean(
        event.title.toLowerCase().includes(searchtext.toLowerCase()) ||
          event.description.toLowerCase().includes(searchtext.toLowerCase())
      )
    );

    SetDisplayEvents(filteredEvents);
  }, [searchtext]);

  if (isLoading) {
    return <Spinner />;
  }

  const getEventByDate = (e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let formDataObj = {};
    for (const key of formData.keys()) {
      formDataObj[key] = formData.get(key);
    }

    if (formDataObj.startTime == "") {
      toast("Please Select Starting  Date and Time toFind Events ");
      return;
    }
    if (formDataObj.endTime == "") {
      toast("Please Select Ending  Date and Time toFind Events ");
      return;
    }

    let filteredEvents = events.filter(
      (event) =>
        new Date(formDataObj.startTime) < new Date(event.timeOfEvent) &&
        new Date(event.timeOfEvent) < new Date(formDataObj.endTime)
    );

    SetDisplayEvents(filteredEvents);
  };
  return (
    <div className="allEvents">
      <div className="d-flex">
        <section className="form filterItem">
          <form onSubmit={getEventByDate}>
            <div className="form-group w-40">
              <label>Find Events After</label>
              <input type="datetime-local" id="time" name="startTime" />
            </div>
            <div className="form-group w-40">
              <label>Find Events Before</label>
              <input type="datetime-local" id="time" name="endTime" />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Search Events
              </button>
            </div>
          </form>
        </section>
        <div className="filterItem">
          <input
            type="text"
            name="requirements"
            id="text"
            placeholder="Search For Events"
            value={searchtext}
            onChange={(e) => SetSearchText(e.target.value)}
          />
        </div>
      </div>
      <section className="content">
        {displayEvents.length > 0 ? (
          <div className="goals">
            {displayEvents.map((event) => (
              <EventItem key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <h3>No Events</h3>
        )}
      </section>
    </div>
  );
}

export default AllEvents;
