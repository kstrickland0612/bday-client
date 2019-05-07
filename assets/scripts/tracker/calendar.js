import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const updateCalendar = function () {
  if (store.calendar) {
    store.calendar.destroy()
  }
  const calendarEl = document.getElementById('calendar')
  const calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin ],
    events: [
      {

        category: '',
        date: ''
      }
    ],
    eventColor: '#70BE94'
  })

  store.calendar = calendar
  store.calendar.render()

  const calEvents = (data) => {
    const events = data.events
    for (let event = 0; event < events.length; event++) {
      const title = (events[event].friend.first_name + ' ' + events[event].friend.last_name + "'s " + events[event].category)
      const date = (events[event].date)
      const createEventObject = function (propertyName1, propertyValue1, propertyName2, propertyValue2) {
        const eventObject = { [propertyName1]: propertyValue1, [propertyName2]: propertyValue2 }
        store.calendar.addEvent(eventObject)
      }
      createEventObject('title', title, 'date', date)
    }
  }

  api.getEvents()
    .then(calEvents)
    .catch(ui.getEventsFail)
}

const addHandlers = () => {
  $('.calendar-link').on('click', updateCalendar)
}

module.exports = {
  addHandlers
}
