
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

function ConferenceForm() {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const [maxPresentations, setMaxPresentations] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleStartChange = (event) => {
    const value = event.target.value;
    setStart(value);
  };

  const handleEndChange = (event) => {
    const value = event.target.value;
    setEnd(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleMaxPresentationsChange = (event) => {
    const value = event.target.value;
    setMaxPresentations(value);
  };

  const handleMaxAttendeesChange = (event) => {
    const value = event.target.value;
    setMaxAttendees(value);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  const fetchData = async () => {
    const url = "http://localhost:8000/api/locations/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      //   console.log(data);
      setLocations(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.starts = start;
    data.ends = end;
    data.description = description;
    data.max_presentations = maxPresentations;
    data.max_attendees = maxAttendees;
    data.location = location;

    const confUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(confUrl, fetchConfig);
      if (response.ok) {
        const newConference = await response.json();
        console.log(newConference);

        setName("");
        setStart("");
        setEnd("");
        setDescription("");
        setMaxPresentations("");
        setMaxAttendees("");
        setLocation("");
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new conference</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                placeholder="Name"
                required
                type="text"
                id="name"
                className="form-control"
                name="name"
                value={name}
              />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleStartChange}
                value={start}
                placeholder="Starts"
                required
                type="date"
                id="starts"
                name="starts"
                className="form-control"
              />
              <label htmlFor="starts">Starts</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleEndChange}
                value={end}
                placeholder="Ends"
                required
                type="date"
                id="ends"
                name="ends"
                className="form-control"
              />
              <label htmlFor="ends">Ends</label>
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                onChange={handleDescriptionChange}
                value={description}
                id="description"
                className="form-control"
                name="description"
                rows="3"
              ></textarea>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleMaxPresentationsChange}
                value={maxPresentations}
                placeholder="Presentations"
                required
                type="number"
                id="max_presentations"
                className="form-control"
                name="max_presentations"
              />
              <label htmlFor="max_presentations">Maximum presentations</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleMaxAttendeesChange}
                value={maxAttendees}
                placeholder="Attendees"
                required
                type="number"
                id="max_attendees"
                className="form-control"
                name="max_attendees"
              />
              <label htmlFor="max_attendees">Maximum attendees</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleLocationChange}
                value={location}
                required
                id="location"
                className="form-select"
                name="location"
              >
                <option value="">Choose a location</option>
                {locations.map((location) => {
                  return (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConferenceForm;
