import PropTypes from 'prop-types';

export const LocationResults = ({ location: { location, current } }) => {
    return (
        <div className="flex flex-row items-center p-3 justify-start rounded-md w-50 sm:px-5 dark:text-gray-100">
            <div className='flex flex-col text-left'>
                <div className="text-center">
                    <h2 className="text-base font-normal font-poppins">{location?.name}</h2>
                </div>
                <div className="mb-2 text-sm font-normal font-poppins">{current?.temp_c}°
                    <span className="mx-1 font-normal font-poppins">/</span>{current?.feelslike_c}°
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <img src={current?.condition.icon} alt={current?.condition.text} className='scale-55' />
                {/* <p className="dark:text-gray-400 text-xs text-center font-poppins">{current?.condition.text}</p> */}
            </div>
        </div>
    )
}