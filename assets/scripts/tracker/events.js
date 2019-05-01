import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

const getFormFields = require('./../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onViewFriends = (event) => {
  event.preventDefault()
  api.getFriends()
    .then(ui.getFriendsSuccess)
    .catch(ui.getFriendsFail)
}

const onAddFriend = (event) => {
  event.preventDefault()

  const data = getFormFields(event.target)
  api.addFriend(data)
    .then(ui.addFriendSuccess)
    .catch(ui.addFriendFail)
}

const onEditFriend = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const id = $(event.target).data('id')
  api.editFriend(data, id)
    .then(ui.editFriendSuccess)
    .catch(ui.editFriendFail)
}

const onDeleteFriend = (event) => {
  event.preventDefault()
  const id = $(event.target).data('id')
  api.deleteFriend(id)
    .then(() => onViewFriends(event))
    .catch(ui.deleteFriendFail)
}

const onViewEvents = (event) => {
  event.preventDefault()
  api.getEvents()
    .then(ui.getEventsSuccess)
    .catch(ui.getEventsFail)
}

const onAddEvent = (event) => {
  event.preventDefault()

  const data = getFormFields(event.target)
  api.addEvent(data)
    .then(ui.addEventSuccess)
    .catch(ui.addEventFail)
}

const onEditEvent = (event) => {
  event.preventDefault()

  const data = getFormFields(event.target)
  const id = $(event.target).data('id')
  api.editEvent(data, id)
    .then(ui.editEventSuccess)
    .catch(ui.editEventFail)
}

const onDeleteEvent = (event) => {
  event.preventDefault()
  const id = $(event.target).data('id')
  api.deleteEvent(id)
    .then(() => onViewEvents(event))
    .catch(ui.deleteEventFail)
}

const onMyAccount = (event) => {
  $('.my-account').show()
  $('.add-friend-form').hide()
  $('.add-event-form').hide()
  $('.view-friends').hide()
  $('.view-events').hide()
  $('.view-friends-header').hide()
  $('.view-events-header').hide()
  $('.user-message').hide()
  $('#calendar').hide()
}

const onAddFriendLink = (event) => {
  $('.add-friend-form').show()
  $('.add-event-form').hide()
  $('.my-account').hide()
  $('.view-friends').hide()
  $('.view-events').hide()
  $('.view-friends-header').hide()
  $('.view-events-header').hide()
  $('.user-message').hide()
  $('#calendar').hide()
}

const onAddEventLink = (event) => {
  api.getFriends()
    .then(ui.getFriendsAsOptionsSuccess)
    .catch(ui.getFriendsFail)
}

const getFriendId = (event) => {
  $('#friendIdFromForm').val($('#options :selected').val())
}

const onCalendar = (event) => {
  $('#calendar').show()
  $('.my-account').hide()
  $('.add-friend-form').hide()
  $('.add-event-form').hide()
  $('.view-friends').hide()
  $('.view-events').hide()
  $('.view-friends-header').hide()
  $('.view-events-header').hide()
  $('.user-message').hide()
}

const clearModalMessages = function (event) {
  $('.edit-friend-message').text('')
  $('.edit-event-message').text('')
}

const closeFriendModalRefresh = function (event) {
  onViewFriends(event)
}

const closeEventModalRefresh = function (event) {
  onViewEvents(event)
}

function checkCat () {
  if ($('#eventCat option:selected').text() === 'Other') {
    $('#category-select').show()
  } else {
    $('#category-select').val($('#eventCat option:selected').text())
    $('#category-select').hide()
  }
}

function checkCatModal () {
  if ($('#eventCatModal option:selected').text() === 'Other') {
    $('#category-select-modal').show()
  } else {
    $('#category-select-modal').val($('#eventCatModal option:selected').text())
    $('#category-select-modal').hide()
  }
}

function onGetEventsForNotifications () {
  api.getEvents()
    .then(ui.getEventsForNotificationsSuccess)
    .catch(ui.getEventsFail)
}

function runClock () {
  const now = new Date()

  const hour = now.getHours() % 12
  const min = now.getMinutes()
  const sec = now.getSeconds()

  const clock = document.querySelector('div.clock')
  const hourHand = clock.querySelector('div.hour')
  const minHand = clock.querySelector('div.minute')
  const secHand = clock.querySelector('div.second')

  const hourRotation = 30 * hour
  const minRotation = 6 * min + (6)
  const secRotation = 6 * sec

  hourHand.style.transform = 'rotate(' + hourRotation + 'deg)'
  minHand.style.transform = 'rotate(' + minRotation + 'deg)'
  secHand.style.transform = 'rotate(' + secRotation + 'deg)'

  requestAnimationFrame(runClock)
}

runClock()

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
  $('.view-friends-button').on('click', onViewFriends)
  $('.view-events-button').on('click', onViewEvents)
  $('.add-friend-form').on('submit', onAddFriend)
  $('.add-event-form').on('submit', onAddEvent)
  $(document).on('submit', '.edit-friend-form', onEditFriend)
  $(document).on('submit', '.edit-event-form', onEditEvent)
  $(document).on('click', '.delete-friend', onDeleteFriend)
  $(document).on('click', '.delete-event', onDeleteEvent)
  $('.calendar-link').on('click', onCalendar)
  $('.account-link').on('click', onMyAccount)
  $('.add-friend-link').on('click', onAddFriendLink)
  $('.add-event-link').on('click', onAddEventLink)
  $('#view-options').change(getFriendId)
  $('.edit-friend').on('click', clearModalMessages)
  $('.edit-event').on('click', clearModalMessages)
  $('body').on('hide.bs.modal', '.edit-friend', closeFriendModalRefresh)
  $('body').on('hide.bs.modal', '.edit-event', closeEventModalRefresh)
  $('#eventCat').change(checkCat)
  $(document).change('eventCat-modal', checkCatModal)
  $('.navbar').mouseenter(onGetEventsForNotifications)
  $('.calendar-link').on('click', updateCalendar)
}

module.exports = {
  addHandlers,
  runClock
}
