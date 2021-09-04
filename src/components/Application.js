import React, { useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import { useState } from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from '../helpers/selectors';


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
       
    
  });
  
  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

 
  

  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = `http://localhost:8001/api/appointments`;
    const interviewersURL = `http://localhost:8001/api/interviewers`;

      Promise.all([
        axios.get(daysURL),
        axios.get(appointmentsURL),
        axios.get(interviewersURL),
      ]).then((all) => {
       console.log(all[0])
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
        console.log(all);
      })
     
    }, []);
    console.log(state.interviewers)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
