import React, { Fragment } from "react";
import useVisualMode from "../../hooks/useVisualMode";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
    Promise.resolve(props.bookInterview(props.id, interview))
      .then(() => transition(SHOW, true))
      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.log("SAVE ERROR: ", error);
      });
  };

  const deleteAppointment = (id) => {
    transition(DELETING);

    Promise.resolve(props.cancelInterview(props.id))
      .then(() => transition(EMPTY, true))
      .catch((error) => {
        transition(ERROR_SAVE, true);
        console.log("SAVE ERROR: ", error);
      });
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
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Error: Unable to save" onClose={back} />
      )}

      {mode === ERROR_DELETE && (
        <Error message="Error: Unable to delete" onClose={back} />
      )}
    </article>
  );
}
