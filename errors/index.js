const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')
const ForbidenError = require('./forbiden.js')

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError, 
  BadRequestError,
  ForbidenError
}
