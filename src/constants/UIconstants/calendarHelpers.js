export const hoursWithMinutes = Array.from({ length: 24 }).reduce(
  (result, _, i) => [...result, `${i}:00`, `${i}:30`],
  []
)

export const areDatesTheSame = (first, second) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};


export const getDateObj = (day, month, year) => {
  return new Date(year, month, day)
}