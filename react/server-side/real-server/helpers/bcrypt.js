const bcrypt = require('bcryptjs');

function hash(input) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(input, salt);
}

function compare(input, hashedInput) {
  return bcrypt.compareSync(input, hashedInput);
}

module.exports = {
  hash,
  compare
}