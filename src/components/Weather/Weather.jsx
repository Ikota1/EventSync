import { useEffect, useState } from "react"
import { LocationResults } from "./Loaction";


const WeatherForecast = () => {
    const [word, setWord] = useState('');
    const [city, setCity] = useState('')
       
    const fetchLocation = (e) => {
        e.preventDefault();
        const API_KEY = "66abec26fe034546987185308232907"
        
        fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${word}&aqi=no`)
        .then(res => res.json()) 
        .then(setCity);
        console.log(city)
    }  

    const handleLocation = (event) => {
        setWord(event.target.value)
    }

    return (
        <div>
            <form onSubmit={fetchLocation}>
                <label htmlFor="word-action" className="text-white">Find your location: </label>
                <input 
                    value={word}
                    onChange={(e) => handleLocation(e)}
                    id='word-action'
                    style={{marginTop: '10px', size:'250'}}
                />
                <button className="text-white">Submit</button>
            </form>
            <div>
                {
                    city ? 
                    <> 
                    <LocationResults location={city}></LocationResults>
                    </> :
                    <>
                    {null}
                    </>
                }
            </div>
        </div>
    )

}

export default WeatherForecast