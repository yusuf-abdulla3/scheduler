import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import classnames from "classnames";
import  './InterviewerList.scss';

export default function InterviewerList(props) {
  
  const interviewers = props.interviewers.map(interviewer => {    
    console.log("interview id", interviewer.id);
    return (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar = {interviewer.avatar}
      setInterviewer = {e => {console.log(interviewer.id); props.onChange(interviewer.id)}}
      selected = {interviewer.id === props.value}
    />

  );
});
console.log("VALUE: ", props.value)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
};
  