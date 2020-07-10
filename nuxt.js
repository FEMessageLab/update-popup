const VersionChecker = require('.')

class NuxtVersionChecker extends VersionChecker {
  constructor() {
    super()
    this.prefix = '/_nuxt'
  }
}

module.exports = NuxtVersionChecker
