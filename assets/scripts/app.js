'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

const authevents = require('./auth/authevents.js')

const trackerevents = require('./tracker/events.js')

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar')

  const calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin ]
  })

  calendar.render()
})

$(() => {
  authevents.addHandlers()
  trackerevents.addHandlers()
})
