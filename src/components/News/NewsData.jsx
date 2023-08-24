import { useEffect, useState } from "react"

export const NewsData = () => {
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
                const url = "https://api.seatgeek.com/2/events?venue.state=NY&client_id=MzU5NTA0Njl8MTY5MjgyOTMyMi44MDc3NDc&client_secret=a3fa6702e7e4aa1c0872310011232becec08b787944a8b7b6257986320302b49"
            try{
                const response  = await fetch(url)

                if(!response .ok){
                    console.log(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json();
                setEventsData(data.events)
            }catch (e) {
                console.log(e)
            }
        }
        fetchData();
    },[])
    console.log(eventsData)

    return(
        <>
        {eventsData.map((el) => (
            <div className="container" key={el.id}>
                <div className=" mx-auto max-w-2xl overflow-hidden rounded-xl dark:bg-gray-900 shadow-md">
                    <div className="xl:flex h-full">
                        <div className="xl:shrink-0">
                            <img
                            className="h-full w-full object-cover hl:full xl:w-40"
                            src={el.performers[0].image}
                            />
                        </div>
                        <div className="p-8">
                            <div className="text-sm font-poppins font-normal tracking-wide text-white">
                                {el.venue.name}, {el.venue.city}, {el.venue.state}
                            </div>
                            <div className="text-sm font-poppins font-normal tracking-wide text-white">
                                {el.venue.name}, {el.venue.state}
                            </div>
                            <a href={el.url} className="mt-1 block text-lg font normal font-poppins leading-tight text-white hover:underline">
                                {el.short_title}
                            </a>
                            <div className="text-sm font-poppins font-normal tracking-wide text-white">
                                {}
                            </div>
                            <p className="mt-2 text-slate-500 font-poppins font-normal">
                                {el.type}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </>
    )
}