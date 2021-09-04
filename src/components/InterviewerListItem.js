import React from "react";
import "./InterviewerListItem.scss";
import classnames from "classnames";


export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  const interviewerClass = `interviewers-item ${
    props.selected ? 'interviewers__item--selected' : ''
  }`
  return (
    <li className= {interviewerClass} onClick = {setInterviewer}>
  <img
    className="interviewers__item-image"
    src= {avatar}
    alt= {name}
  />
  {selected && name}
</li>
  );
};