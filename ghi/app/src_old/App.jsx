/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import "./App.css";
import Nav from "./Nav";
import AttendeesList from "./AttendeesList"
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }

  return (
    <>
        <Nav />

      <div className="container" id="attendee-table">
        <ConferenceForm />
        {/* <LocationForm /> */}
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </>
  );
}

export default App;
