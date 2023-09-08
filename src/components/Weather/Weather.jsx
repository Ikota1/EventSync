import PropTypes from 'prop-types';

export const LocationResults = ({ location: { location, current } }) => {
    return (
        <div className="flex flex-col items-center p-8 rounded-md w-60 sm:px-12 dark:text-gray-100">
            <div className="text-center">
                <h2 className="text-xl font-semibold">{location?.name} / {location?.country}</h2>
                <p className="text-sm dark:text-gray-400">{current?.last_updated}</p>
            </div>
            <img src={current?.condition.icon} alt={current?.condition.text} />
            <div className="mb-2 text-3xl font-semibold">{current?.temp_c}°
                <span className="mx-1 font-normal">/</span>{current?.feelslike_c}°
            </div>
            <p className="dark:text-gray-400">{current?.condition.text}</p>
        </div>
    )
}