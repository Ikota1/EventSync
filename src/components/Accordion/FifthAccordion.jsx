import { useState } from "react";

export const FifthAccordion = () => {
  const [isBodyVisible, setIsBodyVisible] = useState(false);

  const toggleAccordion = () => {
    setIsBodyVisible(!isBodyVisible);
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-5">
        <button
          type="button"
          className="font-poppins font-normal flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          data-accordion-target="#accordion-collapse-body-5"
          aria-expanded={isBodyVisible ? "true" : "false"}
          onClick={toggleAccordion}
          aria-controls="accordion-collapse-body-4"
        >
          <span>TODO?</span>
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
        id="accordion-collapse-body-5"
        className={isBodyVisible ? "" : "hidden"}
        aria-labelledby="accordion-collapse-heading-5"
      >
        <div className="p-5 border border-gray-200 dark:border-gray-700">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima harum repellendus aliquam ipsum quaerat. Delectus, unde illo! Veniam deserunt ab, molestiae, possimus ut odio iure ad vitae, corporis quisquam iste.
          </p>
        </div>
      </div>
    </div>
  );
};
