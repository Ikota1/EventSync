import { useAuthState } from "react-firebase-hooks/auth";
import EventLinks from "./EventLinks"
import { auth } from "../../../firebase/firebase-config";
import { useEffect, useState } from "react";
import { getAllArchivedEvents } from "../../../services/events.service";
import format from 'date-fns/format';
import animationData from '../../../assets/animation_lmi4803y.json';
import Lottie from "lottie-react";

const EventHistory = () => {
    const [user] = useAuthState(auth);
    const [myHistoryEvents, setMyHistoryEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 4;

    useEffect(() => {
        const fetchedHistoryEvents = async () => {
            setLoading(true);
            try {
                if (user) {
                    const archivedEvents = await getAllArchivedEvents();
                    const userHistory = archivedEvents.filter((event) => {

                        return event.participants.includes(user.uid);
                    });
                    setMyHistoryEvents(userHistory);
                }
            } catch (error) {
                console.error('Unable ot fetch historyEvents', error)
            } finally {
                setLoading(false)
            }

        }

        fetchedHistoryEvents();
    }, [user])

    const handleNextPage = () => {
        const totalPages = Math.ceil(myHistoryEvents.length / eventsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const paginatedEvents = myHistoryEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

    return (
        <div className="font-poppins">
            <EventLinks />
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-400"></div>
                </div>
            ) : myHistoryEvents.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full pt-4">
                    <p className="text-blue-300 text-xl">No Events Found</p>
                    <Lottie className="w-[400px] h-[400px]" animationData={animationData} />
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-3 p-5 h-[100%]">
                    {paginatedEvents.map((event) => (
                        <div key={event.id} className="bg-gray-900 text-blue-300 rounded-lg shadow-md p-4 hover:bg-gray-800 hover:text-blue-400 transition-transform duration-300 transform scale-100 hover:scale-105 cursor-pointer">
                            <img src={event.photo} alt={event.title} className="w-full h-60 object-cover rounded-lg mb-4 opacity-20" />
                            <h2 className="text-lg font-semibold">{event.title}</h2>
                            <p className="pt-6 pb-6">{event.description}</p>
                            <p className="pb-4">Location: {event.location}</p>
                            <p> {format(new Date(event.endDate), 'do MMM')} </p>
                        </div>
                    ))};
                </div>
            )};
            <div className={`fixed bottom-0 right-0 py-2 px-6 shadow`}>
                <div className="pagination text-blue-500">
                    <button onClick={handlePreviousPage} className="mr-2 h-12 w-12 rounded-full bg-blue-700 border-blue-600 text-sm text-white transition duration-150 hover:bg-blue-500" disabled={currentPage === 1}>Prev</button>
                    <button onClick={handleNextPage} className="mr-2 h-12 w-12 rounded-full bg-blue-700 border-blue-600 text-sm  text-white transition duration-150 hover:bg-blue-500">Next</button>
                </div>
            </div>
        </div>
    )
}

export default EventHistory