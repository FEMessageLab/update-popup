/**
 * @typedef {string} PathLike
 * @typedef {string} Dir
 */

const path = require('path')
const {join} = require('path')
const fs = require('fs-extra')
const _get = require('lodash.get')
/** @type {(...dir: Dir[]) => PathLike} */
const resolve = (...dir) => path.resolve(__dirname, ...dir)
/** @type {(...dir: Dir[]) => PathLike} */
const resolveTmp = (...dir) => resolve('.tmp', ...dir)

const {resolveWebpackEntry} = require('./utils')

const NAME = 'femessage-update-popup'

class UpdatePopup {
  constructor(
    options = {
      publicPath: '',
      mode: 'standalone'
    }
  ) {
    this.options = options
  }

  /** @type {(compiler: import('webpack').Compiler) => void} */
  apply(compiler) {
    // common
    if (process.env.NODE_ENV !== 'production') return
    // v4
    if (_get(compiler, 'options.mode') !== 'production') return

    // 修改 webpack 入口文件
    compiler.options.entry = resolveWebpackEntry(compiler.options.entry, {
      NAME,
      filePath: resolveTmp('main.js')
    })

    // 先生成写入版本号的文件到 .tmp
    compiler.hooks.beforeRun.tap(NAME, () => {
      // 清空缓存文件夹
      fs.emptyDirSync(resolveTmp())

      const publicPath =
        _get(this, 'options.publicPath') ||
        _get(compiler, 'options.output.publicPath', '')

      const waitForGenerate = []

      if (this.options.mode === 'standalone') {
        waitForGenerate.push({
          str: replaceFileStr(resolve('src', 'useStandalone', 'main.js'), {
            '{{VERSION_FILE_PATH}}': correctPath(publicPath, 'version.txt')
          }),
          dest: resolveTmp('main.js')
        })
      }

      if (this.options.mode === 'webWorker') {
        waitForGenerate.push({
          str: replaceFileStr(resolve('src', 'useWebWorker', 'main.js'), {
            '{{WORKER_FILE_PATH}}': join(
              publicPath,
              'worker',
              'update-popup.js'
            )
          }),
          dest: resolveTmp('main.js')
        })

        waitForGenerate.push({
          str: replaceFileStr(
            resolve('src', 'useWebWorker', 'worker', 'update-popup.js'),
            {
              '{{VERSION_FILE_PATH}}': correctPath(publicPath, 'version.txt')
            }
          ),
          dest: resolveTmp('worker', 'update-popup.js')
        })
      }

      waitForGenerate.forEach(item => {
        fs.outputFileSync(item.dest, item.str)
      })
    })

    // 复制文件到 webpack 输出目录
    compiler.hooks.done.tap(NAME, () => {
      const outputPath = _get(compiler, 'outputPath', '')

      if (this.options.mode === 'webWorker') {
        fs.copySync(resolveTmp('worker'), join(outputPath, 'worker'))
      }

      // 版本号文件
      fs.outputFileSync(
        join(outputPath, 'version.txt'),
        process.env.VERSION || '1.0.0'
      )
    })
  }
}

module.exports = UpdatePopup

/** @type {(filePath: PathLike, replaceStrMap: {[k: string]: PathLike}) => string} */
function replaceFileStr(filePath, replaceStrMap = {}) {
  let str = fs.readFileSync(filePath, 'utf8')

  // TODO 需要更好的替换内容，尽量执行1次
  Object.keys(replaceStrMap).forEach(k => {
    str = str.replace(k, replaceStrMap[k])
  })

  return str
}

/** @type {(publicPath: PathLike, args: Array<PathLike>) => PathLike} */
function correctPath(publicPath, ...args) {
  let p = join(publicPath, ...args)

  if (publicPath.slice(0, 2) === '//') {
    p = '/' + p
  }

  return p
}
