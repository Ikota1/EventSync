import React, { useState, useEffect } from "react";
import styles from "../../style";

export const NewsData = () => {
  const [eventsData, setEventsData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.seatgeek.com/2/events?venue.state=NY&client_id=MzU5NTA0Njl8MTY5MjgyOTMyMi44MDc3NDc&client_secret=a3fa6702e7e4aa1c0872310011232becec08b787944a8b7b6257986320302b49";
      try {
        const response = await fetch(url);

        if (!response.ok) {
          console.log(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEventsData(data.events);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <p className={`${styles.flexCenter} font-poppins font-normal pb-5 xs:text-[20px] text-[15px] sx:leading-[26px] leading-[21px] text-gradient uppercase ml-3`}>Recent Events</p>
    <div
      id="carouselExampleCaptions"
      className="relative"
      data-te-carousel-init
      data-te-ride="carousel"
      >
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
        data-te-carousel-indicators
      >
      </div>
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {/* Event items */}
        {eventsData.map((el, index) => (
          <div
          key={el.id}
          id={el.id}
          className={`relative float-left ${
            index === currentSlide ? "" : "-mr-[100%]"
          } w-full transition-transform duration-600 ease-in-out`}
          data-te-carousel-active
          data-te-carousel-item
          style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex justify-center items-center xl:max-w-[1280px] w-full h-80 mx-auto brightness-50">
              <img
                src={el.performers[0].image}
                className="block w-screen h-auto object-cover"
                alt="..."
              />
            </div>
            <div className="absolute font-poppins font-bold inset-x-[15%] bottom-5 hidden py-0 text-center text-white md:block">
              <h6 className="text-xl"><a href={el.url}>{el.short_title}</a></h6>
              <p className="text-dimWhite">
                {el.venue.name}, {el.venue.city}
              </p>
              <p className="text-dimWhite">#{el.type}</p>
            </div>
          </div>
        ))}
        {/* Previous button */}
        <button
          className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="prev"
          // Update current slide index
          onClick={() =>
            setCurrentSlide(
              currentSlide === 0 ? eventsData.length - 1 : currentSlide - 1
              )
            }
            >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="h-8 w-8"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
                />
            </svg>
          </span>
        </button>
        {/* Next button */}
        <button
          className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="next"
          // Update current slide index
          onClick={() =>
            setCurrentSlide(
              currentSlide === eventsData.length - 1 ? 0 : currentSlide + 1
              )
            }
            >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="h-8 w-8"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
      </div>
    </div>
  </>
  );
};

export default NewsData;
