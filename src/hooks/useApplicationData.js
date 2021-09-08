import React, { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = (initial) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const findDay = (id) => {
    for (const day of state.days) {
      for (const appointmentId of day.appointments) {
        if (id === appointmentId) {
          return day;
        }
      }
    }
  };

  const updateSpots = (id, appointments) => {
    const foundDay = findDay(id);
    let spots = 0;
    for (const appointmentId of foundDay.appointments) {
      if (appointments[appointmentId].interview === null) {
        spots += 1;
      }
    }

    const spotDay = state.days.map((day) => {
      if (day.name === foundDay.name) {
        return { ...day, spots };
      }
      return day;
    });
    return spotDay;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(id, appointments);
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        return res;
      })
      .then(
        setState({
          ...state,
          appointments,
          days,
        })
      );
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(id, appointments);

    return axios.delete(`/api/appointments/${id}`).then(
      setState({
        ...state,
        appointments,
        days,
      })
    );
  };

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => console.log("ERROR: ", error));
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;
