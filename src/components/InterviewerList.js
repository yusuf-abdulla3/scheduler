import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import classnames from "classnames";
import  './InterviewerList.scss';

export default function InterviewerList(props) {
  
  const interviewers = props.interviewers.map(interviewer => {    
 
    return (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar = {interviewer.avatar}
      setInterviewer = {e => {props.onChange(interviewer.id)}}
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
  