import React, { Fragment } from "react";
import useVisualMode from "../../hooks/useVisualMode";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"

export default function Appointment(props) {
  const interview = { student: props.name, interviewer: props.interviewer };
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE);
  }
  const onCancel = () => {
    back();
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel = {onCancel}
          onSave = {save}
         
        />
      )}

      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
