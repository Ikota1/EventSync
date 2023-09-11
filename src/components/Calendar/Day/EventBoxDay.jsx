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
      {/* TODO */}
      {/* {duration > 1 && (
        <p className="text-xs">
          {duration < 24
            ? `Duration: ${duration} hours`
            : `Duration: ${Math.floor(duration / 24)} days, ${duration % 24} hours`}
        </p>
      )} */}
   </React.Fragment>
  );
}

export default EventBoxDay;
