const UpdatePopup = require('.')

/** @typedef {any} NuxtModule */
/** @type {(this: NuxtModule) => void} */
export default function nuxtUpdatePopup() {
  this.extendBuild(config => {
    config.plugins.push(new UpdatePopup())
  })
}
