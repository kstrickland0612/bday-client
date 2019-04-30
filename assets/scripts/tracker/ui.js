const showFriendsTemplate = require('../templates/friend-listing.handlebars')
const showEventsTemplate = require('../templates/event-listing.handlebars')
const showEventNotificationsTemplate = require('../templates/event-notifications.handlebars')
const showFriendsAsSelectOptionsTemplate = require('../templates/friend-options-listing.handlebars')

const getFriendsSuccess = (data) => {
  const showFriendsHtml = showFriendsTemplate({ friends: data.friends })
  $('.edit-friend').modal('hide')
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
  $('.view-events').hide()
  $('.view-events-header').hide()
  $('.view-friends').show()
  $('.view-friends-header').show()
  $('.view-friends').html(showFriendsHtml)
  $('form').trigger('reset')
  $('.user-message').hide()
}

const getFriendsAsOptionsSuccess = (data) => {
  const showFriendsAsSelectOptionsHtml = showFriendsAsSelectOptionsTemplate({ friends: data.friends })
  $('.add-event-form').show()
  $('#view-options').html(showFriendsAsSelectOptionsHtml)
  $('.add-friend-form').hide()
  $('.my-account').hide()
  $('.view-friends').hide()
  $('.view-events').hide()
  $('.user-message').hide()
  $('.view-friends-header').hide()
  $('.view-events-header').hide()
  $('#calendar').hide()
}

const getFriendsFail = function (data) {
  $('.view-friends').text('Something went wrong. Please try again.')
  $('form').trigger('reset')
  $('.user-message').hide()
}

const addFriendSuccess = function () {
  $('.user-message').show()
  $('.user-message').text('Friend Added!')
  $('form').trigger('reset')
}

const addFriendFail = function () {
  $('.user-message').show()
  $('.user-message').text('Failed to add friend. Please try again.')
  $('form').trigger('reset')
}

const editFriendSuccess = function () {
  $('.edit-friend-message').text('Friend Updated!')
  $('form').trigger('reset')
  $('.user-message').hide()
}

const editFriendFail = function () {
  $('.edit-friend-message').text('Failed to edit friend. Please try again.')
  $('form').trigger('reset')
  $('.user-message').hide()
}

// const deleteFriendSuccess = function () {
//   $('.user-message').text('Friend Deleted')
// }

const deleteFriendFail = function () {
  $('.user-message').text('Failed to delete friend. Please try again.')
}

const addEventSuccess = function () {
  $('.user-message').show()
  $('.user-message').text('Event Added!')
  $('form').trigger('reset')
  $('#category-select').hide()
}

const getEventsForNotificationsSuccess = (data) => {
  const showEventNotifications = showEventNotificationsTemplate({ events: data.events })
  $('#event-notifications').show()
  $('#event-notifications').html(showEventNotifications)
}

const getEventsSuccess = (data) => {
  const showEventsHtml = showEventsTemplate({ events: data.events })
  const showEventNotifications = showEventNotificationsTemplate({ events: data.events })
  $('.view-friends').hide()
  $('.view-friends-header').hide()
  $('.view-events').show()
  $('.view-events-header').show()
  $('.view-events').html(showEventsHtml)
  $('#event-notifications').show()
  $('#event-notifications').html(showEventNotifications)
  $('form').trigger('reset')
  $('.user-message').hide()
  $('.edit-event').modal('hide')
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
}

const getEventsFail = function (data) {
  $('.view-friends').show()
  $('.view-friends').text('Something went wrong. Please try again.')
  $('form').trigger('reset')
  $('.user-message').hide()
}

const addEventFail = function () {
  $('.user-message').show()
  $('.user-message').text('Failed to add event. Please try again.')
  $('form').trigger('reset')
}

const editEventSuccess = function () {
  $('.edit-event-message').show()
  $('.edit-event-message').text('Event Updated!')
  $('form').trigger('reset')
}

const editEventFail = function () {
  $('.edit-event-message').show()
  $('.edit-event-message').text('Failed to edit event. Please try again.')
  $('form').trigger('reset')
  $('.user-message').hide()
}

const deleteEventFail = function () {
  $('.user-message').text('Failed to delete friend. Please try again.')
}

const calEvents = (data) => {
  console.log(data)
  const events = Object.entries(data)
  console.log(events)
  for (let myevent = 0; myevent < events.length; myevent++) {
    console.log(Object.entries(myevent))
  }
  // calendar.addEvent(data)
}

module.exports = {
  getFriendsSuccess,
  getFriendsFail,
  addFriendSuccess,
  addFriendFail,
  editFriendSuccess,
  editFriendFail,
  deleteFriendFail,
  getEventsSuccess,
  getEventsFail,
  addEventSuccess,
  addEventFail,
  editEventSuccess,
  editEventFail,
  deleteEventFail,
  getFriendsAsOptionsSuccess,
  getEventsForNotificationsSuccess,
  calEvents
}
