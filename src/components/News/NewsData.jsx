import React, { useState, useEffect, useRef } from "react";
import styles from "../../style";
import { getPublicEvents } from "../../services/events.service";
import format from "date-fns/format";
import TicketPurchaseBtn from "../TicketPurchaseBtn/TicketPurchaseBtn";
import { AuthContext } from "../../context/UserContext";
import { useContext } from "react";

export const NewsData = () => {
  const { userData } = useContext(AuthContext);

  const [eventsData, setEventsData] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchPublicEvents = async () => {
      try {
        const publicEventsData = await getPublicEvents();
        setEventsData(publicEventsData);
      } catch (error) {
        console.error('Unable to fetch public events', error);
      }
    };

    fetchPublicEvents();

    const intervalId = setInterval(handleRightClick, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleLeftClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  const handleRightClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  return (
    <>
      <p className={`${styles.flexCenter} font-poppins font-normal pb-5 xs:text-[20px] text-[15px] sx:leading-[26px] leading-[21px] text-gradient uppercase ml-3`}>
        Recent Events
      </p>
      <div className="relative flex flex-itme">
        <button className="text-white flex-1 flex items-center justify-center" onClick={handleLeftClick}>
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="h-7 w-7">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </span>
        </button>
        <div
          id="slider"
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth no-scrollbar">
          {eventsData.map((el, index) => (
            <div className="inline-block px-3 hover:text-blue-400 transition-transform duration-300 transform scale-100 hover:scale-105" key={el.id}>
              <div
                id={el.id}
                className={`w-96 h-auto max-w-xs cursor-pointer overflow-hidden rounded-lg hover:scale-105 duration-300 ease-in-out`}
                data-te-carousel-active
                data-te-carousel-item
                style={{ backfaceVisibility: "hidden" }}>
                <div
                  key={el.id}
                  className="bg-gray-900 text-gray-300 rounded-lg shadow p-4">
                  <img
                    src={el.photo}
                    alt={el.title}
                    className="w-full h-60 object-cover rounded-lg mb-4" />
                  <h2 className="text-lg font-semibold">{el.title}</h2>
                  <p className="pt-6 pb-6">{el.description}</p>
                  {userData !== null && <TicketPurchaseBtn />}
                  <p className="pb-4">Tickets Remaining 42</p>
                  <p className="pb-4">Location: {el.location}</p>
                  <p>
                    {format(new Date(el.startDate), "do MMM")} | {el.startHour}h - {el.endHour}h
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="text-white flex-1 flex items-center justify-center" onClick={handleRightClick}>
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="h-7 w-7">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
};

export default NewsData;
