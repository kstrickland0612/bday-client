const showFriendsTemplate = require('../templates/friend-listing.handlebars')

const getFriendsSuccess = (data) => {
  const showFriendsHtml = showFriendsTemplate({ friends: data.friends })
  $('.view-friends').html(showFriendsHtml)
  $('form').trigger('reset')
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
  $('.edit-friend-message').text('Failed to add friend. Please try again.')
  $('form').trigger('reset')
}

const deleteFriendSuccess = function () {
  $('.user-message').text('Friend Deleted')
}

const deleteFriendFail = function () {
  $('.user-message').text('Failed to delete friend. Please try again.')
}

module.exports = {
  getFriendsSuccess,
  getFriendsFail,
  addFriendSuccess,
  addFriendFail,
  editFriendSuccess,
  editFriendFail,
  deleteFriendSuccess,
  deleteFriendFail
}
