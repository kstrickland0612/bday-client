'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authevents = require('./auth/authevents.js')

const trackerevents = require('./tracker/events.js')

const clock = require('./tracker/clock.js')

const calendar = require('./tracker/calendar.js')

// const config = require('./config')

$(() => {
  authevents.addHandlers()
  trackerevents.addHandlers()
  clock.runClock()
  calendar.addHandlers()
})
