import React, { useContext } from 'react';
import { arrowLeft, arrowRight } from '../../assets';
import { GlobalContext } from '../../context/UserContext';


const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  }

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <header className='px-4 py-2 flex items-center'>
      <button className='border rounded py-2 px-4 mr-5'>Today</button>
      <button onClick={handlePrevMonth}>
        <img src={arrowLeft} alt="" />
      </button>
      <button onClick={handleNextMonth}>
        <img src={arrowRight} alt="" />
      </button>
    </header>
  )
}

export default CalendarHeader