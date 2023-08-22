import { useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "../../views/SignUp/SingUpPartOne";

export const SingleAccordion = () => {
  const [isBodyVisible, setIsBodyVisible] = useState(false);

  const toggleAccordion = () => {
    setIsBodyVisible(!isBodyVisible);
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="font-poppins font-normal flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 rounded-t-xl border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded={isBodyVisible ? "true" : "false"}
          aria-controls="accordion-collapse-body-1"
          onClick={toggleAccordion}
        >
          <span>Getting Started</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={isBodyVisible ? "" : "hidden"}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p className="font-poppins font-normal mb-2 text-gray-500 dark:text-gray-400">
          Welcome to  
          <a className="text-blue-600 dark:text-blue-500"> EventSync</a>, 
          the premier web application designed to revolutionize the way you 
          <a className="text-blue-600 dark:text-blue-500"> discover, create</a>,
          and 
          <a className="text-blue-600 dark:text-blue-500"> connect</a> through events! Whether you're a social butterfly, 
          an event organizer, or someone looking to explore exciting activities, EventSync is your all-in-one solution. Get ready 
          to immerse yourself in a world of endless possibilities, where every event is just a click away.
          </p>
          <ul className="font-poppins font-normal pl-5 text-gray-500 list-disc dark:text--400">
            <li>
              <a
                className="text-blue-600 dark:text-blue-500"
              >
                Explore a World of Events
              </a>
            </li>
            <li>
              <a
                className="text-blue-600 dark:text-blue-500"
              >
                Create and Customize
              </a>
            </li>
            <li>
              <a
                className="text-blue-600 dark:text-blue-500"
              >
                Connect with Like-Minded Individuals
              </a>
            </li>
            <li>
              <a
                className="text-blue-600 dark:text-blue-500"
              >
                Stay Informed
              </a>
            </li>
            <li>
              <a
                className="text-blue-600 dark:text-blue-500"
              >
                Seamless Planning and Participation
              </a>
            </li>
            <li>
              <a
                className="text-blue-600 dark:text-blue-500"
              >
                Share and Spread the Word
              </a>
            </li>
          </ul>
          <p className="font-poppins font-normal mb-2 text-gray-500 dark:text-gray-400">
            Join the EventSync Revolution Today!
          </p>
        </div>
      </div>
    </div>
  );
};
