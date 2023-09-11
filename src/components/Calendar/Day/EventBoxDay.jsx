import React from "react";
import { Link } from "react-router-dom";


const EventBoxDay = ({ title, id, duration, isUsedInWeek }) => {
  console.log(title);
  console.log(id);
  console.log(duration);
  console.log(isUsedInWeek);


  return (
    <React.Fragment >
      <Link to={`../events/${id}`} className={`truncate text-${isUsedInWeek ? "sm" : "md"} mb-1`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2>{title}</h2>
      </Link>
    </React.Fragment>
  );
}

export default EventBoxDay;
