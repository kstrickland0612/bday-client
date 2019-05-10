const config = require('../config')
const store = require('../store.js')

const getFriends = function () {
  return $.ajax({
    url: config.apiUrl + '/friends',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const addFriend = function (data) {
  return $.ajax({
    url: config.apiUrl + '/friends',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'friend': {
        'first_name': data.first_name,
        'last_name': data.last_name,
        'dob': data.dob
      }
    }
  })
}

const editFriend = function (data, id) {
  return $.ajax({
    url: config.apiUrl + `/friends/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'friend': {
        'first_name': data.first_name,
        'last_name': data.last_name,
        'dob': data.dob
      }
    }
  })
}

const deleteFriend = function (id) {
  return $.ajax({
    url: config.apiUrl + `/friends/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getEvents = function (data) {
  return $.ajax({
    url: config.apiUrl + '/events',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const addEvent = function (data) {
  return $.ajax({
    url: config.apiUrl + '/events',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'event': {
        'title': data.title,
        'category': data.category,
        'date': data.date,
        'action': data.action,
        'friend_id': data.friend_id,
        'is_annual': data.is_annual
      }
    }
  })
}

const editEvent = function (data, id) {
  return $.ajax({
    url: config.apiUrl + `/events/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'event': {
        'title': data.title,
        'category': data.category,
        'date': data.date,
        'action': data.action,
        'friend_id': data.friend_id
      }
    }
  })
}

const deleteEvent = function (id) {
  return $.ajax({
    url: config.apiUrl + `/events/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getFriends,
  addFriend,
  editFriend,
  deleteFriend,
  getEvents,
  addEvent,
  editEvent,
  deleteEvent
}
