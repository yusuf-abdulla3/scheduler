import React from "react";
import classnames from "classnames/bind";
import "./Button.scss";

const Button = (props) => {
  const buttonClass = classnames({
    button: true,
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
