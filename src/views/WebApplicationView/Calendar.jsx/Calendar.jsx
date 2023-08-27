import { useState, useContext, useEffect } from 'react';
import { getMonth } from '../../../components/Calendar/utils/utils';
import Month from '../../../components/Calendar/Month';
import CalendarHeader from '../../../components/Calendar/CalendarHeader';
import { GlobalContext } from '../../../context/UserContext';
import CreateEventButton from '../../../components/CreateEventButton/CreateEventButton';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <div className='text-white'>
        <CalendarHeader />
        <div className='h-screen flex'>
          <div className="flex flex-1 w-[70%]">
            <Month month={currentMonth} />
          </div>
          <div className="w-[30%]">
            <CreateEventButton onEventCreated={() => showEventModal(true)} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Calendar