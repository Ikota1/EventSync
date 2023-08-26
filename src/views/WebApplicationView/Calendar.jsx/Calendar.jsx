import { useState, useContext, useEffect } from 'react';
import { getMonth } from '../../../components/Calendar/utils/utils';
import Month from '../../../components/Calendar/Month';
import CalendarHeader from '../../../components/Calendar/CalendarHeader';
import { GlobalContext } from '../../../context/UserContext';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <div className='text-white'>
        <CalendarHeader />
        <div className='h-screen flex'>
          <div className="flex flex-1 w-[80%]">
            <Month month={currentMonth} />
          </div>
          <div className="w-[20%]">
            List Of Events
          </div>
        </div>
      </div>
    </>
  )
}

export default Calendar