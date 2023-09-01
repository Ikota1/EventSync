export const LocationResults = ( {location: {location, current}}) => {

    return (
        <>
        <div className="text-white">
            Temperature in {location.name} ({location.region} reg. | {location.country}) is {current.temp_c} deg. - {current.condition.text}
        </div>
        <div className="text-white">
            {current.condition.text}
            <div>
                <img src={current.condition.icon} alt={current.condition.text} />
            </div>
        </div>
        </>
    )
}