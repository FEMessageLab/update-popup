/**
 * @typedef {string} PathLike
 * @typedef {string} Dir
 */

const path = require('path')
const fs = require('fs-extra')
/** @type {(...dir: Dir[]) => PathLike} */
const resolve = (...dir) => path.resolve(__dirname, ...dir)
/** @type {(...dir: Dir[]) => PathLike} */
const resolveTmp = (...dir) => resolve('.tmp', ...dir)

const {resolveWebpackEntry} = require('./utils')

const NAME = 'femessage-update-popup'

class UpdatePopup {
  constructor() {
    // 注册 worker 和查询版本号文件路径前缀
    // 由于 nuxt 的构建输出方式略微不同：先生成到 `/.nuxt/dist/client` 再复制到 `/dist/_nuxt`
    this.prefix = ''
  }

  /** @type {(compiler: import('webpack').Compiler) => void} */
  apply(compiler) {
    if (process.env.NODE_ENV !== 'production') return

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
      /** @type {(filePath: PathLike) => string} */
      const replacePrefix = filePath => {
        return fs
          .readFileSync(filePath, 'utf8')
          .replace('{{prefix}}', this.prefix)
      }

      const mainFile = {
        str: replacePrefix(resolve('src', 'main.js')),
        dest: resolveTmp('main.js')
      }

      const workerFile = {
        str: replacePrefix(resolve('src', 'worker', 'update-popup.js')),
        dest: resolveTmp('worker', 'update-popup.js')
      }

      fs.outputFileSync(mainFile.dest, mainFile.str)
      fs.outputFileSync(workerFile.dest, workerFile.str)
    })

    // 复制文件到 webpack 输出目录
    compiler.hooks.done.tap(NAME, () => {
      const {outputPath} = compiler

      fs.copySync(
        resolveTmp('worker'),
        path.join(outputPath, 'worker')
      )

      // 版本号文件
      fs.outputFileSync(
        path.join(outputPath, 'version.txt'),
        process.env.VERSION || '',
        'utf-8'
      )
    })
  }
}

module.exports = UpdatePopup
