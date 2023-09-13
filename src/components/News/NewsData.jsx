import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import { getPublicEvents } from "../../services/events.service";
import styles from "../../style";
import format from "date-fns/format";
import { Link } from "react-router-dom";

export const NewsData = () => {

  const [eventsData, setEventsData] = useState([]);
  const { userData } = useContext(AuthContext)

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
  }, []);

  return (
    <div className="font-poppins">
      <p className={`${styles.flexCenter} font-poppins font-normal pb-5 xs:text-[20px] text-[15px] sx:leading-[26px] leading-[21px] text-gradient uppercase ml-3`}>
        Recent Events
      </p>
      {/* first set of items */}
      <div className="relative flex flex-item overflow-x-hidden">
        <div
          id="horizontal-scrolling-items"
          className="w-full h-full scroll whitespace-nowrap scroll-smooth no-scrollbar">
          {eventsData.slice(-5).map((el) => (
            <div className="inline-block px-3 py-5 hover:text-blue-400 transition-transform transform scale-100 hover:scale-105" key={el.id}>
               <Link to={userData ? `/event/${el.id}` : '/login'}> 
              <div
                id={el.id}
                className={`w-96 max-w-xs cursor-pointer rounded-lg hover:scale-105 duration-300 ease-in-out`}
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
                  <p className="pb-4">Location: {el.location}</p>
                  <p>
                    {format(new Date(el.startDate), "do MMM")} | {el.startHour}h - {el.endHour}h
                  </p>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
        {/* second set of items */}
        <div
          id="horizontal-scrolling-items"
          className="w-full h-full scroll whitespace-nowrap scroll-smooth no-scrollbar">
          {eventsData.slice(-5).map((el) => (
            <div className="inline-block px-3 py-5 hover:text-blue-400 transition-transform transform scale-100 hover:scale-105" key={el.id}>
                <Link to={userData ? `/event/${el.id}` : '/login'}> 
              <div
                id={el.id}
                className={`w-96 max-w-xs cursor-pointer rounded-lg hover:scale-105 duration-300 ease-in-out`}
                data-te-carousel-active
                data-te-carousel-item
                style={{ backfaceVisibility: "hidden" }}>

                <div key={el.id} className="bg-gray-900 text-gray-300 rounded-lg shadow p-4">
                  <img
                    src={el.photo}
                    alt={el.title}
                    className="w-full h-60 object-cover rounded-lg mb-4" />
                  <h2 className="text-lg font-semibold">{el.title}</h2>
                  <p className="pb-4">Location: {el.location}</p>
                  <p>
                    {format(new Date(el.startDate), "do MMM")} | {el.startHour}h - {el.endHour}h
                  </p>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsData;
