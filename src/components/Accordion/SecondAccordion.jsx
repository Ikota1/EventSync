import { useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "../../views/SignUp/SingUpPartOne";
import Hero from "../Hero/Hero";
import News from "../../views/News/News";
import FAQ from "../../views/FAQ/FAQ";


export const SecondAccordion = () => {
  const [isBodyVisible, setIsBodyVisible] = useState(false);

  const toggleAccordion = () => {
    setIsBodyVisible(!isBodyVisible);
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-2">
        <button
          type="button"
          className="font-poppins font-normal flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          data-accordion-target="#accordion-collapse-body-2"
          aria-expanded={isBodyVisible ? "true" : "false"}
          onClick={toggleAccordion}
          aria-controls="accordion-collapse-body-2"
        >
          <span>What are the difference between Public user, User and Premium user?</span>
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
        id="accordion-collapse-body-2"
        className={isBodyVisible ? "" : "hidden"}
        aria-labelledby="accordion-collapse-heading-2"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
          <p className="font-poppins font-normal mb-2 text-gray-500 dark:text-gray-400">
            The main difference is what rights the user has.
          </p>
          <p className="font-poppins font-normal mb-2 text-gray-500 dark:text-gray-400" >
            The Public user has a restricted access, and is allow to few features of the sites
            such as:
            <ul>
                <Link to="/" element={<Hero/>}>
                    <li>
                        <a className="text-blue-600 dark:text-blue-500 hover:underline"> Landing Page</a>
                    </li>
                </Link>
                <Link to="/news" element={<News/>}>
                    <li>
                        <a className="text-blue-600 dark:text-blue-500 hover:underline"> News</a>
                    </li>
                </Link>
                <Link to="/faq" element={<FAQ/>}>
                    <li>
                        <a className="text-blue-600 dark:text-blue-500 hover:underline"> FAQ</a>
                    </li>
                </Link>
            </ul> 
          </p>
          <p className="font-poppins font-normal mb-2 text-gray-500 dark:text-gray-400">
            After successful 
            <Link to="/signup" element={<SignUp/>}>
            <a className="text-blue-600 dark:text-blue-500 hover:underline"> registration </a>
            </Link>
            the User has access to the main interface, where
            event can be browsed, searched and bought. Furthermore the User has access to
            schedule calendar where he/she can track events.
          </p>
          <p className="font-poppins font-normal mb-2 text-gray-500 dark:text-gray-400">
            The Premium user on top of the rights of the User, can create events and
            sent gifts to other users
          </p>
        </div>
      </div>
    </div>
  );
};
