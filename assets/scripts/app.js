'use strict'

import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authevents = require('./auth/authevents.js')

const trackerevents = require('./tracker/events.js')

// const config = require('./config')

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
