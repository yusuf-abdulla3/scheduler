import React, { Fragment } from "react";
import useVisualMode from "../../hooks/useVisualMode";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log("PROPS: ", props);
  const onAdd = () => {
    transition(CREATE);
  };
  const onCancel = () => {
    back();
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    Promise.resolve(props.bookInterview(props.id, interview)).then(() =>
      transition(SHOW)
    );
  };

  const deleteAppointment = (id) => {
    transition(DELETING);

    Promise.resolve(props.cancelInterview(props.id)).then(() =>
      transition(EMPTY)
    );
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={deleteAppointment}
          onCancel={onCancel}
        />
      )}

      {mode === DELETING && <Status message="Deleting" />}

      {
        (mode = EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onCancel={back}
            onSave={save}
          />
        ))
      }

      {/* {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )} */}
    </article>
  );
}
