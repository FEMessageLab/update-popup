const UpdatePopup = require('.')

export default function nuxtUpdatePopup() {
  this.extendBuild(config => {
    config.plugins.push(new UpdatePopup())
  })
}
