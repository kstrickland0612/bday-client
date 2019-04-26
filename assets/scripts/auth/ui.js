const store = require('../store.js')

const fail = function (data) {
  $('.user-message').text('Something went wrong. Please try again.')
  $('form').trigger('reset')
}

const signUpSuccess = function (data) {
  $('.user-message').text('Sign up success!')
  $('form').trigger('reset')
  $('#sign-up').hide()
  $('#sign-in').show()
}

const signInSuccess = function (data) {
  $('.user-message').text('Sign in success!')
  $('form').trigger('reset')
  store.user = data.user
  $('#sign-in').hide()
  $('.nav').show()
  $('#sign-out').show()
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
  $('#sign-in').show()
  $('.my-account').hide()
}

module.exports = {
  fail,
  signUpSuccess,
  signInSuccess,
  changePwSuccess,
  changePwFail,
  signOutSuccess
}
