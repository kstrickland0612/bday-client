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
  console.log(data)
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
  console.log(id)
  console.log(data)
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
  console.log(id)
  return $.ajax({
    url: config.apiUrl + `/friends/${id}`,
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
  deleteFriend
}
