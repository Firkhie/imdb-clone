function slug(title) {
  return title.split(' ').join('-')
}

module.exports = slug