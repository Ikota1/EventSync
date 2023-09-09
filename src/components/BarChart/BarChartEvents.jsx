import dayjs from 'dayjs';
import { useState } from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
  
  
const BarChartEvents = ({ events }) => {

  const [eventsData, setEventsData] = useState(Array.from({ length: 7 }).map((event, index) => {

    const date = dayjs()
      .add(index - (7 - 1), 'day')
      .format('DD/MM/YYYY');

    const eventsToday = events.filter((event) => {

      const formattedDate = dayjs(event.createdOn).format('DD/MM/YYYY');
      if (date === formattedDate) {
        return event;
      }

    })

    return {
      date,
      events: eventsToday.length
    }

  }))

  return (

    <BarChart
      width={500}
      height={300}
      data={eventsData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="date" />
      <YAxis allowDecimals={false}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="events" fill="#8884d8" />
    </BarChart>

  );
}

export default BarChartEvents
