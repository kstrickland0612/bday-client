const getFormFields = require('./../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

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
    .then(() => onViewFriends(event))
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
}

const onAddFriendLink = (event) => {
  $('.add-friend-form').show()
  $('.add-event-form').hide()
  $('.my-account').hide()
  $('.view-friends').hide()
  $('.view-events').hide()
}

const onAddEventLink = (event) => {
  $('.add-event-form').show()
  $('.add-friend-form').hide()
  $('.my-account').hide()
  $('.view-friends').hide()
  $('.view-events').hide()
}

const addHandlers = () => {
  $('.view-friends-button').on('click', onViewFriends)
  $('.view-events-button').on('click', onViewEvents)
  $('.add-friend-form').on('submit', onAddFriend)
  $('.add-event-form').on('submit', onAddEvent)
  $('body').on('submit', '.edit-friend-form', onEditFriend)
  $('body').on('submit', '.edit-event-form', onEditEvent)
  // $('.edit-friend-form').on('submit', onEditFriend)
  $('body').on('click', '.delete-friend', onDeleteFriend)
  $('body').on('click', '.delete-event', onDeleteEvent)
  $('.account-link').on('click', onMyAccount)
  $('.add-friend-link').on('click', onAddFriendLink)
  $('.add-event-link').on('click', onAddEventLink)
}

module.exports = {
  addHandlers
}
