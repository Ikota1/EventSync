import { useContext, useState } from 'react';
import { arrowLeft, arrowRight } from '../../assets';
import { GlobalContext } from '../../context/UserContext';
import dayjs from 'dayjs';
import { calendarViews } from '../../constants/UIconstants/calendarEnumsConstants';
import ViewControl from './ViewControl';


const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [view, setView] = useState(calendarViews.MONTH)

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  }

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  }

  const handleReset = () => {
    setMonthIndex(dayjs().month());
  }

  return (
    <header className='px-4 py-2 flex items-center'>
      <h2 className='pr-5'>Calendar</h2>
      <button onClick={handleReset} className='rounded py-2 px-4 mr-5'>Today</button>
      <button onClick={handlePrevMonth}>
        <img src={arrowLeft} alt="" />
      </button>
      <button onClick={handleNextMonth}>
        <img src={arrowRight} alt="" />
      </button>
      <h2 className='ml-4 text-xl text-white font-bold'>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</h2>
      <ViewControl view={view} setView={setView} />
    </header>
  )

}

export default CalendarHeader