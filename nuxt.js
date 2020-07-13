const UpdatePopup = require('.')

class NuxtUpdatePopup extends UpdatePopup {
  constructor() {
    super()
    this.prefix = '/_nuxt'
  }
}

module.exports = NuxtUpdatePopup
