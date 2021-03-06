import React from "react";
import DayListItem from "./DayListItem";
import "./DayListItem.scss";

const DayList = (props) => {
  const dayListSection = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));
  return <ul>{dayListSection}</ul>;
};

export default DayList;
