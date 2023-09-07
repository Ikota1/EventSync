import { areDatesTheSame } from "./calendarHelpers"
import { countDays } from "./count.days"
import { eventReoccurrence } from "./count.days"

export const daysBetween = (firstDate, secondDate) => {
  const diffTime = secondDate.getTime() - firstDate.getTime()

  return Math.round(diffTime / (1000 * 3600 * 24))
}
export const isIntermediateDate = (date, event) => {
  const eventStartDate = new Date(event.startDate)
  const eventEndDate = new Date(event.endDate)
  const currentDate = date
  currentDate.setHours(0, 0, 0, 0)
  eventStartDate.setHours(0, 0, 0, 0)
  eventEndDate.setHours(0, 0, 0, 0)

  const intermediateDates = daysBetween(eventStartDate, currentDate)
  if (eventStartDate <= currentDate && currentDate <= eventEndDate) {
    return true
  }

  if (areDatesTheSame(currentDate, eventEndDate)) {
    return false
  }
  if (
    (event.isEndless === true || (!event.isEndless && currentDate < event.endOfSeries)) &&
    intermediateDates > 0 &&
    !areDatesTheSame(event.startDate, eventEndDate)
  ) {
    if (
      event.reoccurrence === eventReoccurrence.weekly &&
      Math.round(intermediateDates % countDays.Weekly) <= Math.round(event.duration / 24)
    ) {
      return true
    }
    if (
      event.reoccurrence === eventReoccurrence.monthly &&
      eventStartDate.getDate() <= currentDate.getDate() &&
      currentDate.getDate() <= eventEndDate.getDate()
    ) {
      return true
    }
    if (
      event.reoccurrence === eventReoccurrence.yearly &&
      eventStartDate.getDate() <= currentDate.getDate() &&
      currentDate.getDate() <= eventEndDate.getDate() &&
      currentDate.getMonth() >= eventStartDate.getMonth() &&
      currentDate.getMonth() <= eventEndDate.getMonth()
    ) {
      return true
    }
  }
  return false
}

export const getEventsForDate = (events, date) =>
  events.filter((event) => {
    if (!event.startDate || !event.endDate) {
      return false;
    }
    const eventStartDate = new Date(event.startDate)
    const eventEndDate = new Date(event.endDate)
    const currentDate = date
    currentDate.setHours(0, 0, 0, 0)
    eventStartDate.setHours(0, 0, 0, 0)
    eventEndDate.setHours(0, 0, 0, 0)

    const intermediateDates = daysBetween(eventStartDate, currentDate)
    if (eventStartDate <= currentDate && currentDate <= eventEndDate) {
      return true
    }
    if (
      eventStartDate < currentDate &&
      (event.isEndless === true || (!event.isEndless && currentDate < event.endOfSeries)) &&
      ((event.reoccurrence === eventReoccurrence.daily && intermediateDates % countDays.Daily === 0) ||
        (event.reoccurrence === eventReoccurrence.weekly && intermediateDates % countDays.Weekly === 0) ||
        (event.reoccurrence === eventReoccurrence.monthly && currentDate.getDate() === eventStartDate.getDate()) ||
        (event.reoccurrence === eventReoccurrence.yearly &&
          currentDate.getDate() === eventStartDate.getDate() &&
          currentDate.getMonth() === eventStartDate.getMonth()))
    ) {
      return true
    }
    if (isIntermediateDate(date, event)) return true
    return areDatesTheSame(currentDate, event.startDate)
  })
