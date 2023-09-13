import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";


const EventBoxDay = ({ title, id, duration, isUsedInWeek }) => {
  return (
    <React.Fragment >
      <Link to={`../events/${id}`} className={`font-poppins truncate text-${isUsedInWeek ? "sm" : "md"} mb-1`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2>{title}</h2>
      </Link>
    </React.Fragment>
  );
}

EventBoxDay.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  duration: PropTypes.number,
  isUsedInWeek: PropTypes.bool.isRequired,
};

export default EventBoxDay;
