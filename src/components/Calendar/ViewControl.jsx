import { useState } from 'react';
import { calendarViews } from '../../constants/UIconstants/calendarEnumsConstants';
import PropTypes from 'prop-types';

const ViewControl = ({ view, setView }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className="relative inline-block text-left mb-3">
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        id="menu-button"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true">
        {view.view}
        <svg className={`-mr-1 h-5 w-5 ${isDropdownOpen ? 'transform rotate-180' : ''} text-gray-400`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="fixed z-10 left-70 top-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
          <div className="py-1" role="none">
            <ul onClick={() => setIsDropdownOpen(false)}>
              {Object.values(calendarViews).map((v) => (
                <li key={v.view} onClick={() => setView(v)} className='text-primary cursor-pointer flex justify-center'>
                  <span>{v.view}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

ViewControl.propTypes = {
  view: PropTypes.shape({
    view: PropTypes.string.isRequired,
  }).isRequired,
  setView: PropTypes.func.isRequired,
};

export default ViewControl

