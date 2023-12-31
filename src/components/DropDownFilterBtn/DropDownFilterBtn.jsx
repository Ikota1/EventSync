import { useState } from 'react';
import PropTypes from 'prop-types';

const DropDownFilterBtn = ({ onFilterLive, onFilterOnline, onFilterAll }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='font-poppins'>
      <button
        onClick={toggleDropdown}
        className="text-white bg-thirdly hover:bg-thirdlyHover focus:outline-none font-medium rounded-r-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button">
        Filter By
        <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li onClick={() => setIsDropdownOpen(false)}><a href="#" onClick={onFilterLive} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Live Events</a></li>
            <li onClick={() => setIsDropdownOpen(false)}><a href="#" onClick={onFilterOnline} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Online Events</a></li>
            <li onClick={() => setIsDropdownOpen(false)}><a href="#" onClick={onFilterAll} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All Events</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

DropDownFilterBtn.propTypes = {
  onFilterLive: PropTypes.func.isRequired,
  onFilterOnline: PropTypes.func.isRequired,
  onFilterAll: PropTypes.func.isRequired,
};

export default DropDownFilterBtn;
