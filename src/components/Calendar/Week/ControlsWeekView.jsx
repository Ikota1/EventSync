import PropTypes from 'prop-types';

const ControlsWeekView = ({ value, onChange, isMonth }) => {
  return (
    <div className="flex justify-center gap-5 h-10 font-poppins">
      <span
        className="rounded cursor-pointer"
        onClick={() => onChange("prev")}>
        {"<"}
      </span>
      <h2 className="text-lg font-light">
        {isMonth ? value : ` Week: ${value}`}
      </h2>
      <span className="rounded cursor-pointer" onClick={() => onChange("next")}> {">"} </span>
    </div>
  );
}

ControlsWeekView.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  isMonth: PropTypes.bool.isRequired,
};

export default ControlsWeekView;
