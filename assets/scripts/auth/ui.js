const store = require('../store.js')

const fail = function (data) {
  $('.user-message').text('Something went wrong. Please try again.')
  $('form').trigger('reset')
}

const signUpSuccess = function (data) {
  $('.user-message').text('Sign up success!')
  $('form').trigger('reset')
}

const signInSuccess = function (data) {
  $('.user-message').text('Sign in success!')
  $('form').trigger('reset')
  store.user = data.user
}

const changePwSuccess = function (data) {
  $('.changepw-message').text('Change password success!')
  $('form').trigger('reset')
}

const changePwFail = function (data) {
  $('.changepw-message').text('Change password failed, please try again.')
  $('form').trigger('reset')
}

const signOutSuccess = function (data) {
  $('.user-message').text('Sign out success!')
  $('form').trigger('reset')
  store.user = null
}

module.exports = {
  fail,
  signUpSuccess,
  signInSuccess,
  changePwSuccess,
  changePwFail,
  signOutSuccess
}
