import { arrowLeft, arrowRight } from "../../../assets";
import { add, format, sub } from "date-fns";
import PropTypes from 'prop-types';

const DayControls = ({ date, setDate }) => {
  const prevDay = () => setDate(sub(date, { days: 1 }));
  const nextDay = () => setDate(add(date, { days: 1 }));
  const currentDate = () => setDate(new Date());

  return (
    <div className="flex justify-center gap-3 font-poppins items-center p-2 top-0 z-20">
      <button
        className="text-lg md:text-md px-3 py-1 rounded focus:outline-none"
        onClick={currentDate}>
        Today
      </button>
      <div className="space-x-1">
        <button
          className="p-1 border rounded focus:outline-none"
          onClick={prevDay}>
          <img src={arrowLeft} className="w-5 h-5" />
        </button>
        <button
          className="p-1 border rounded focus:outline-none"
          onClick={nextDay}>
          <img src={arrowRight} className="w-5 h-5" />
        </button>
      </div>
      <h2 className="font-medium text-md">{format(date, "dd LLLL yyyy")}</h2>
    </div>
  );
}

DayControls.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
};

export default DayControls;
