const showFriendsTemplate = require('../templates/friend-listing.handlebars')

const getFriendsSuccess = (data) => {
  const showFriendsHtml = showFriendsTemplate({ friends: data.friends })
  $('.view-friends').html(showFriendsHtml)
}

const getFriendsFail = function (data) {
  $('.view-friends').text('Something went wrong. Please try again.')
  $('form').trigger('reset')
}

const addFriendSuccess = function () {
  $('.user-message').text('Friend Added!')
}

const addFriendFail = function () {
  $('.user-message').text('Failed to add friend. Please try again.')
}

const editFriendSuccess = function () {

}

const editFriendFail = function () {

}

module.exports = {
  getFriendsSuccess,
  getFriendsFail,
  addFriendSuccess,
  addFriendFail,
  editFriendSuccess,
  editFriendFail
}
