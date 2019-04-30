// HELPER EXAMPLE
// This helper would be used in a .handlebars file
// with the syntax {{limit title 20}}

'use strict'
//
// const limit = (str, length) => {
//   if (str.length <= length) {
//     return str
//   } else {
//     return str.substring(0, length) + '...'
//   }
// }

const moment = require('moment')

const dateCompare = (edate) => {
  const today = new Date()

  const now = moment(today).format('YYYY-MM-DD')

  if (moment(edate).format('YYYY-MM-DD') === now) {
    return true
  }
}

module.exports = dateCompare
