'use strict'

const moment = require('moment')

const dateFormat = (edate) => {
  const formatDate = moment(edate).format('dddd, MMMM Do YYYY')

  return formatDate
}

module.exports = dateFormat
