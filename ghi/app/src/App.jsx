import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm'
import MainPage from './MainPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path='attendees'>
            <Route element={<AttendeesList attendees={props.attendees}/>} />
          </Route>
          <Route path='attendees'>
            <Route path='new' element={<AttendConferenceForm/>} />
          </Route>
          <Route path='conferences'>
            <Route path='new' element={<ConferenceForm/>} />
          </Route>
          <Route path='presentations'>
            <Route path='new' element={<PresentationForm/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
