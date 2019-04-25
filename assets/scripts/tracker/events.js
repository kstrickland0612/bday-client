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
    .then(ui.addFriendSuccess)
    .catch(ui.addFriendFail)
}

const onEditFriend = (event) => {
  event.preventDefault()

  const data = getFormFields(event.target)
  api.editFriend(data)
    .then(ui.editFriendSuccess)
    .catch(ui.editFriendFail)
}

const addHandlers = () => {
  $('.view-friends-button').on('click', onViewFriends)
  $('.add-friend-form').on('submit', onAddFriend)
  $('.edit-friend-form').on('submit', onEditFriend)
}

module.exports = {
  addHandlers
}
