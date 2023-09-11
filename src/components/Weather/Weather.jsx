import PropTypes from 'prop-types';

export const LocationResults = ({ location: { location, current } }) => {
  return (
    <>
      <div className="flex flex-row items-center p-3 justify-start rounded-md w-50 sm:px-5 dark:text-gray-100">
        <div className='flex flex-col text-left'>
          <div className="text-center">
            <h2 className="text-base font-normal font-poppins">{location?.name}</h2>
          </div>
          <div className="mb-2 text-sm font-normal font-poppins">
            {current?.temp_c}°
            <span className="mx-1 font-normal font-poppins">/</span>
            {current?.humidity} %
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <img src={current?.condition.icon} alt={current?.condition.text} className='scale-55' />
        </div>
      </div>
    </>
  )
}

LocationResults.propTypes = {
  location: PropTypes.shape({
    location: PropTypes.shape({
      name: PropTypes.string,
    }),
    current: PropTypes.shape({
      temp_c: PropTypes.number,
      humidity: PropTypes.number,
      condition: PropTypes.shape({
        icon: PropTypes.string,
        text: PropTypes.string,
      }),
    }),
  }),
};
