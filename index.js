/**
 * @typedef {string} PathLike
 * @typedef {string} Dir
 */

const path = require('path')
const fs = require('fs-extra')
const _get = require('lodash.get')
/** @type {(...dir: Dir[]) => PathLike} */
const resolve = (...dir) => path.resolve(__dirname, ...dir)
/** @type {(...dir: Dir[]) => PathLike} */
const resolveTmp = (...dir) => resolve('.tmp', ...dir)

const {resolveWebpackEntry} = require('./utils')

const NAME = 'femessage-update-popup'

class UpdatePopup {
  /** @type {(compiler: import('webpack').Compiler) => void} */
  apply(compiler) {
    // common
    if (process.env.NODE_ENV !== 'production') return
    // v4
    if (_get(compiler, 'options.mode') !== 'production') return

    // 修改 webpack 入口文件
    compiler.options.entry = resolveWebpackEntry(
      compiler.options.entry,
      {
        NAME,
        filePath: resolveTmp('main.js')
      }
    )

    // 先生成写入版本号的文件到 .tmp
    compiler.hooks.beforeRun.tap(NAME, () => {
      const publicPath = _get(compiler, 'options.output.publicPath', '')

      /** @type {(filePath: PathLike, replaceStrMap: {[k: string]: PathLike}) => string} */
      const replaceFileStr = (filePath, replaceStrMap = {}) => {
        let str = fs.readFileSync(filePath, 'utf8')

        // TODO 需要更好的替换内容，尽量执行1次
        Object.keys(replaceStrMap).forEach(k => {
          str = str.replace(k, replaceStrMap[k])
        })

        return str
      }

      const mainFile = {
        str: replaceFileStr(resolve('src', 'main.js'), {
          '{{WORKER_FILE_PATH}}': path.join(publicPath, 'worker', 'update-popup.js')
        }),
        dest: resolveTmp('main.js')
      }

      const workerFile = {
        str: replaceFileStr(resolve('src', 'worker', 'update-popup.js'), {
          '{{VERSION_FILE_PATH}}': path.join(publicPath, 'version.txt')
        }),
        dest: resolveTmp('worker', 'update-popup.js')
      }

      fs.outputFileSync(mainFile.dest, mainFile.str)
      fs.outputFileSync(workerFile.dest, workerFile.str)
    })

    // 复制文件到 webpack 输出目录
    compiler.hooks.done.tap(NAME, () => {
      const outputPath = _get(compiler, 'outputPath', '')

      fs.copySync(
        resolveTmp('worker'),
        path.join(outputPath, 'worker')
      )

      // 版本号文件
      fs.outputFileSync(
        path.join(outputPath, 'version.txt'),
        process.env.VERSION || ''
      )
    })
  }
}

module.exports = UpdatePopup
