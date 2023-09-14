import dayjs from 'dayjs';
import { useState } from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import PropTypes from 'prop-types';

const BarChartEvents = ({ events }) => {

  const [eventsData] = useState(Array.from({ length: 7 }).map((event, index) => {

    const date = dayjs()
      .add(index - (7 - 1), 'day')
      .format('DD/MM/YYYY');

    const eventsToday = events.filter((event) => {

      const formattedDate = dayjs(event.createdOn).format('DD/MM/YYYY');
      if (date === formattedDate) {
        return event;
      }
    })
    console.log('all', eventsToday.length)
    return {
      date,
      events: eventsToday.length
    }
  }))

  return (
    <div className="text-center font-poppins">
      <h2 className="text-xl text-white mb-4">All Events in the Last 7 Days</h2>
      <div className="flex justify-center">
        <BarChart width={500} height={300} data={eventsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="events" fill="#48B4E9" />
        </BarChart>
      </div>
    </div>
  );
}
BarChartEvents.propTypes = {
  events: PropTypes.array.isRequired,
};

export default BarChartEvents
