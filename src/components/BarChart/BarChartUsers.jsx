import dayjs from 'dayjs';
import { useState } from 'react';
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const BarChartUsers = ({ users }) => {

  const [usersData, setUsersData] = useState(Array.from({ length: 7 }).map((user, index) => {

    const date = dayjs()
      .add(index - (7 - 1), 'day')
      .format('DD/MM/YYYY');
    console.log('Date', date)

    const usersToday = users.filter((user) => {

      const formattedDate = dayjs(user.createdOn).format('DD/MM/YYYY');
      if (date === formattedDate) {
        return user;
      }

    })

    return {
      date,
      users: usersToday.length
    }

  }))

  return (

    <BarChart
      width={500}
      height={300}
      data={usersData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="date" />
      <YAxis allowDecimals='false' />
      <Tooltip />
      <Legend />
      <Bar dataKey="users" fill="#8884d8" />
    </BarChart>

  );
}

export default BarChartUsers
