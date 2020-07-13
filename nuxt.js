const UpdatePopup = require('.')

class NuxtUpdatePopup extends UpdatePopup {
  constructor() {
    super()
    this.prefix = '/_nuxt'
  }
}

export default function nuxtUpdatePopup() {
  this.extendBuild(config => {
    config.plugins.push(new NuxtUpdatePopup())
  })
}
