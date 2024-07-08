import React, {useEffect, useState } from 'react';

function PresentationForm() {
    const [presenterName, setPresenterName] = useState('');
    const [presenterEmail, setPresenterEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [conference, setConference] = useState('');

    const [conferences, setConferences] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.presenter_name = presenterName;
        data.presenter_email = presenterEmail;
        data.company_name = companyName;
        data.title = title;
        data.synopsis = synopsis;
        data.conference = conference;
        console.log(data.conference)

        const conferenceUrl = `http://localhost:8000/api/conferences/${data.conference}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setPresenterName('');
            setPresenterEmail('');
            setCompanyName('');
            setTitle('');
            setSynopsis('');
            setConference('');
        }
    }

    const handlePresenterNameChange = (event) => {
        const value = event.target.value;
        setPresenterName(value);
    }
    const handlePresenterEmailChange = (event) => {
        const value = event.target.value;
        setPresenterEmail(value);
    }
    const handleCompanyNameChange = (event) => {
        const value = event.target.value;
        setCompanyName(value);
    }
    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }
    const handleSynopsisChange = (event) => {
        const value = event.target.value;
        setSynopsis(value);
    }
    const handleConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
    }



    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="form-floating mb-3">
                <input value={presenterName} onChange={handlePresenterNameChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control"></input>
                <label htmlFor="presenter_name">Presenter name</label>
                </div>
                <div className="form-floating mb-3">
                <input value={presenterEmail} onChange={handlePresenterEmailChange} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control"></input>
                <label htmlFor="presenter_email">Presenter email</label>
                </div>
                <div className="form-floating mb-3">
                <input value={companyName} onChange={handleCompanyNameChange} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control"></input>
                <label htmlFor="company_name">Company name</label>
                </div>
                <div className="form-floating mb-3">
                <input value={title} onChange={handleTitleChange} placeholder="Title" required type="text" name="title" id="title" className="form-control"></input>
                <label htmlFor="title">Title</label>
                </div>
                <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea value={synopsis} onChange={handleSynopsisChange} className="form-control" id="synopsis" rows="3" name="synopsis"></textarea>
                </div>
                <div className="mb-3">
                <select value={conference} onChange={handleConferenceChange} required name="conference" id="conference" className="form-select">
                    <option>Choose a conference</option>
                    {conferences.map(conference => {
                    return (
                    <option key={conference.id} value={conference.id}>
                        {conference.name}
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

export default PresentationForm;
