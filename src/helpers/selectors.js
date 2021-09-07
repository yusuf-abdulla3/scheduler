export const getAppointmentsForDay = (state, day) => {
  const filteredAppointments = []
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.appointments.forEach(appointmentId => {
        filteredAppointments.push(state.appointments[appointmentId])
      })
    }
  })
  return filteredAppointments;
}

export function getInterviewersForDay(state, day) {
  const filteredInterviewers = []
  state.days.forEach(stateDay => {
    if (stateDay.name === day) {
      stateDay.interviewers.forEach(interviewerId => {
        filteredInterviewers.push(state.interviewers[interviewerId])
      })
    }
  })
  return filteredInterviewers
}

export const getInterview = (state, interview) => {
  if (interview) {
    const interviewId = interview.interviewer;
    const interviewer = state.interviewers[interviewId];
   
    return { ...interview, interviewer };
  }
  return null;
};