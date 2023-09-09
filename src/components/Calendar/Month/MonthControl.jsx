import { add, format, sub } from 'date-fns';
import { arrowLeft, arrowRight } from '../../../assets';

const MonthControl = ({ date, onChange }) => {
  const prevMonth = () => onChange(sub(date, { months: 1 }));
  const nextMonth = () => onChange(add(date, { months: 1 }));
  const currentDate = () => onChange(new Date());

  return (
    <div className='flex items-center'>
      <button onClick={currentDate}>Today</button>
      <button onClick={prevMonth}>
        <img src={arrowLeft} alt="" />
      </button>
      <button onClick={nextMonth}>
        <img src={arrowRight} alt="" />
      </button>
      <h2 className='ml-4 text-xl text-white font-bold'>{format(date, 'LLLL yyyy')}</h2>
    </div>
  )
}

export default MonthControl