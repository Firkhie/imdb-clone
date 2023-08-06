function errorHandler(error, request, response, next) {
  let status
  let message

  switch (error.name) {
    case 'Unauthenticated':
    case 'JsonWebTokenError':
      status = 401
      message = 'Unauthenticated'
      break;

    case 'NotFound':
      status = 404
      message = 'Data not found'
      break;

    case 'SequelizeValidationError':
      status = 400
      message = error.errors[0].message
      break;

    case 'SequelizeUniqueConstraintError':
      status = 409
      message = error.errors[0].message
      break;

    case 'Forbidden':
      status = 403
      message = 'You are not authorized'
      break;

    case 'EmailPasswordIsRequired':
      status = 400
      message = 'Email or password is required'
      break;

    case 'EmailPasswordIsInvalid':
      status = 404
      message = 'Email or password is incorrect'
      break;

    case 'DuplicatedWishlist':
      status = 409
      message = 'Product already wishlisted'
      break;

    default:
      status = 500
      message = 'Internal Server Error'
      break;
  }

  response.status(status).json({ message })
}

module.exports = errorHandler