const UpdatePopup = require('.')

/** @typedef {any} NuxtModule */
/** @type {(this: NuxtModule) => void} */
export default function nuxtUpdatePopup(options) {
  this.extendBuild(config => {
    config.plugins.push(new UpdatePopup(options))
  })
}
