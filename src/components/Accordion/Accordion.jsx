import Footer from "../Footer/Footer";
import { accordionConstants } from "../../constants/UIconstants/accordionConstants";
import { useState } from "react";

export const Accordion = () => {
  const [isBodyVisible, setIsBodyVisible] = useState(
    accordionConstants.map(() => false)
  );

  const toggleAccordion = (index) => {
    const updatedIsBodyVisible = isBodyVisible.map((value, i) =>
      i === index ? !value : false
    );
    setIsBodyVisible(updatedIsBodyVisible);
  };

  return (
    <>
      {accordionConstants.map((el, index) => (
        <div key={el.id} className="font-poppins">
          <h2 id={el.id}>
            <button
              type="button"
              className="font-poppins flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border rounded-t-xl border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              data-accordion-target="#accordion-collapse-body-1"
              aria-expanded={isBodyVisible[index] ? "true" : "false"}
              aria-controls="accordion-collapse-body-1"
              onClick={() => toggleAccordion(index)}>
              <span>{el.title}</span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5" />
              </svg>
            </button>
            <div
              id="accordion-collapse-body-1"
              className={isBodyVisible[index] ? "" : "hidden"}
              aria-labelledby="accordion-collapse-heading-1">
              <div className="p-5 border rounded-b-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <p className="font-poppins font-normal mb-2 text-gray-500 dark:text-gray-400">
                  {el.content}
                </p>
              </div>
            </div>
          </h2>
          ;
        </div>
      ))}
    </>
  );
};
