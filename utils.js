/**
 * @typedef {string} PathLike
 * @typedef {string} Dir
 * @typedef {{[k:string]: any}} obj
 */

const fs = require('fs-extra')
const path = require('path')
const pupa = require('pupa')

exports.join = path.join
/** @type {(...dir: Dir[]) => PathLike} */
exports.resolve = (...dir) => path.resolve(__dirname, ...dir)

// https://webpack.js.org/configuration/entry-context/#entry
/** @type {(webpackEntry: any | obj, opts: obj) => obj} */
exports.resolveWebpackEntry = (webpackEntry, opts = {}) => {
  if (isObject(webpackEntry)) {
    return {
      ...webpackEntry,
      [opts.NAME]: opts.filePath
    }
  }

  if (Array.isArray(webpackEntry)) {
    return [...webpackEntry, opts.filePath]
  }

  if (isString(webpackEntry)) {
    return [webpackEntry, opts.filePath]
  }

  // 其他方式，如 promise, function 则调整为类似于默认的情况，webpack 会自己处理动态入口
  return {
    // 默认 main
    main: webpackEntry,
    [opts.NAME]: opts.filePath
  }
}

/**
 * @type {(filePath: PathLike, replaceStrMap: {[k: string]: PathLike}) => string}
 */
exports.replaceFileStr = (filePath, replaceStrMap = {}) => {
  return pupa(fs.readFileSync(filePath, 'utf8'), replaceStrMap)
}

/**
 * @type {(publicPath: PathLike, ...args: Array<PathLike>) => PathLike}
 */
exports.correctPath = (publicPath, ...args) => {
  let p = path.join(publicPath, ...args)

  if (publicPath.slice(0, 2) === '//') {
    p = '/' + p
  }

  return p
}

/**
 * @type {(items: Array<import('.').WaitForGenerate>) => void}
 */
exports.generateFiles = items => {
  items.forEach(({str, dest}) => fs.outputFileSync(dest, str))
}

function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

function isString(target) {
  return Object.prototype.toString.call(target) === '[object String]'
}
