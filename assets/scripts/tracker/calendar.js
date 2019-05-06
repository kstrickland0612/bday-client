import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

const moment = require('moment')

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

  const birthdayCreator = (data) => {
    const friends = data.friends
    for (let friend = 0; friend < friends.length; friend++) {
      const birthday = (friends[friend].dob)
      const ageCalculator = function () {
        const today = new Date()
        const diff = (moment(today).format('YYYY')) - (moment(birthday).format('YYYY'))
        return diff
      }
      const ordinalSuffix = function (i) {
        const j = i % 10
        const k = i % 100
        if (j === 1 && k !== 11) {
          return i + 'st'
        } if (j === 2 && k !== 12) {
          return i + 'nd'
        } if (j === 3 && k !== 13) {
          return i + 'rd'
        } else {
          return i + 'th'
        }
      }
      const title = (friends[friend].first_name + ' ' + friends[friend].last_name + "'s " + ordinalSuffix(ageCalculator()) + ' Birthday')
      const today = new Date()
      const date = (moment(today).format('YYYY') + '-' + moment(friends[friend].dob).format('MM-DD'))
      const createBirthdayEventObject = function (propertyName1, propertyValue1, propertyName2, propertyValue2) {
        const eventObject = { [propertyName1]: propertyValue1, [propertyName2]: propertyValue2 }
        store.calendar.addEvent(eventObject)
      }
      createBirthdayEventObject('title', title, 'date', date)
    }
  }

  api.getEvents()
    .then(calEvents)
    .catch(ui.getEventsFail)

  api.getFriends()
    .then(birthdayCreator)
    .catch(ui.getFriendsFail)
}

const addHandlers = () => {
  $('.calendar-link').on('click', updateCalendar)
}

module.exports = {
  addHandlers
}
