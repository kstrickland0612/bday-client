const showFriendsTemplate = require('../templates/friend-listing.handlebars')
const showEventsTemplate = require('../templates/event-listing.handlebars')
const showFriendsAsSelectOptionsTemplate = require('../templates/friend-options-listing.handlebars')

const getFriendsSuccess = (data) => {
  const showFriendsHtml = showFriendsTemplate({ friends: data.friends })
  $('.view-events').hide()
  $('.view-events-header').hide()
  $('.view-friends').show()
  $('.view-friends-header').show()
  $('.view-friends').html(showFriendsHtml)
  $('form').trigger('reset')
}

const getFriendsAsOptionsSuccess = (data) => {
  const showFriendsAsSelectOptionsHtml = showFriendsAsSelectOptionsTemplate({ friends: data.friends })
  $('.add-event-form').show()
  $('#view-options').html(showFriendsAsSelectOptionsHtml)
  $('.add-friend-form').hide()
  $('.my-account').hide()
  $('.view-friends').hide()
  $('.view-events').hide()
}

const getFriendsFail = function (data) {
  $('.view-friends').text('Something went wrong. Please try again.')
  $('form').trigger('reset')
}

const addFriendSuccess = function () {
  $('.user-message').text('Friend Added!')
  $('form').trigger('reset')
}

const addFriendFail = function () {
  $('.user-message').text('Failed to add friend. Please try again.')
  $('form').trigger('reset')
}

const editFriendSuccess = function () {
  $('.edit-friend-message').text('Friend Updated!')
  $('form').trigger('reset')
}

const editFriendFail = function () {
  $('.edit-friend-message').text('Failed to edit friend. Please try again.')
  $('form').trigger('reset')
}

// const deleteFriendSuccess = function () {
//   $('.user-message').text('Friend Deleted')
// }

const deleteFriendFail = function () {
  $('.user-message').text('Failed to delete friend. Please try again.')
}

const addEventSuccess = function () {
  $('.user-message').text('Event Added!')
  $('form').trigger('reset')
}

const getEventsSuccess = (data) => {
  const showEventsHtml = showEventsTemplate({ events: data.events })
  $('.view-friends').hide()
  $('.view-friends-header').hide()
  $('.view-events').show()
  $('.view-events-header').show()
  $('.view-events').html(showEventsHtml)
  $('form').trigger('reset')
}

const getEventsFail = function (data) {
  $('.view-friends').text('Something went wrong. Please try again.')
  $('form').trigger('reset')
}

const addEventFail = function () {
  $('.user-message').text('Failed to add event. Please try again.')
  $('form').trigger('reset')
}

const editEventSuccess = function () {
  $('.edit-event-message').text('Event Updated!')
  $('form').trigger('reset')
}

const editEventFail = function () {
  $('.edit-event-message').text('Failed to edit event. Please try again.')
  $('form').trigger('reset')
}

// const deleteEventSuccess = function () {
//   $('.user-message').text('Event Deleted')
// }

const deleteEventFail = function () {
  $('.user-message').text('Failed to delete friend. Please try again.')
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
  getFriendsAsOptionsSuccess
}
