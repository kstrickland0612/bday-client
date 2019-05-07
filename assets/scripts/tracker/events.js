const getFormFields = require('./../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const moment = require('moment')
const config = require('../config')
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
    .then(addFriendBirthday)
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

const addFriendBirthday = function (data) {
  const friend = data.friend
  const birthday = (friend.dob)
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
  const category = (ordinalSuffix(ageCalculator()) + ' Birthday')
  const today = new Date()
  const date = (moment(today).format('YYYY') + '-' + moment(friend.dob).format('MM-DD'))

  $.ajax({
    url: config.apiUrl + '/events',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'event': {
        'category': category,
        'date': date,
        'action': '',
        'friend_id': friend.id
      }
    }
  })
}

const newYear = function () {
  const addFriendBirthdayNewYear = function (data) {
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
      const category = (ordinalSuffix(ageCalculator()) + ' Birthday')
      const today = new Date()
      const date = (moment(today).format('YYYY') + '-' + moment(friends[friend].dob).format('MM-DD'))

      $.ajax({
        url: config.apiUrl + '/events',
        method: 'POST',
        headers: {
          Authorization: 'Token token=' + store.user.token
        },
        data: {
          'event': {
            'category': category,
            'date': date,
            'action': '',
            'friend_id': friends[friend].id
          }
        }
      })
    }
  }
  const today = new Date()
  if (moment(today).format('MM-DD') === '01-01') {
    api.getFriends()
      .then(addFriendBirthdayNewYear)
      .catch(ui.getEventsFail)
  }
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
}

module.exports = {
  addHandlers,
  newYear
}
