import { useDispatch } from "react-redux";
import { createEvent } from "../features/events/eventSlice";
import { toast } from "react-toastify";

function EventForm() {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let formDataObj = {};
    for (const key of formData.keys()) {
      formDataObj[key] = formData.get(key);
    }

    if (!formDataObj.title) {
      toast.error("Add Title");
      return;
    }
    if (!formDataObj.timeOfEvent) {
      toast.error("Add Event Time");
      return;
    }
    if (!formDataObj.requirements) {
      toast.error("Add Event Requirements");
      return;
    }
    if (!formDataObj.playersLimit) {
      toast.error("Add Event Max No Of People");
      return;
    }
    if (!formDataObj.description) {
      toast.error("Add Event Description");
      return;
    }

    dispatch(createEvent(formDataObj));
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Event Title</label>
          <input type="text" name="title" id="text" />
        </div>
        <div className="form-group">
          <label htmlFor="text">Event Description</label>
          <textarea type="text" name="description" id="text" />
        </div>
        <div className="form-group">
          <label for="birthdaytime">Timimg (date and time):</label>
          <input type="datetime-local" id="time" name="timeOfEvent" />
        </div>
        <div className="form-group">
          <label htmlFor="text">Max No Of People</label>

          <input type="number" name="playersLimit" id="text" />
        </div>
        <div className="form-group">
          <label htmlFor="text">Requirements</label>
          <input type="text" name="requirements" id="text" />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Add Event
          </button>
        </div>
      </form>
    </section>
  );
}

export default EventForm;
