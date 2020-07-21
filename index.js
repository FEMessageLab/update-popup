/**
 * @typedef {import('./utils').PathLike} PathLike
 * @typedef {import('./utils').Dir} Dir
 */

/**
 * @typedef {{
 *  publicPath?: string
 *  mode?: 'standalone' | 'webWorker'
 *  inject?: boolean
 * }} UpdatePopupOptions
 */

const fs = require('fs-extra')
const _get = require('lodash.get')
const {
  resolveWebpackEntry,
  replaceFileStr,
  correctPath,
  resolve,
  join
} = require('./utils')

/** @type {(...dir: Dir[]) => PathLike} */
const resolveApp = (...dir) => resolve('app', ...dir)

const NAME = 'femessage-update-popup'

class UpdatePopup {
  /** @param {UpdatePopupOptions} options */
  constructor(options) {
    this.options = Object.assign(
      {
        publicPath: '',
        mode: 'standalone',
        inject: true // 自动注入到 webpack.entry
      },
      options
    )
  }

  /** @type {(compiler: import('webpack').Compiler) => void} */
  apply(compiler) {
    // common
    if (process.env.NODE_ENV !== 'production') return
    // v4
    if (_get(compiler, 'options.mode') !== 'production') return

    // 修改 webpack 入口文件
    if (this.options.inject) {
      compiler.options.entry = resolveWebpackEntry(compiler.options.entry, {
        NAME,
        filePath: resolveApp('main.js')
      })
    }

    // 先生成写入版本号的文件到 app
    compiler.hooks.beforeRun.tap(NAME, () => {
      // 清空缓存文件夹
      fs.emptyDirSync(resolveApp())

      const publicPath =
        _get(this, 'options.publicPath') ||
        _get(compiler, 'options.output.publicPath', '')

      const waitForGenerate = []

      if (this.options.mode === 'standalone') {
        waitForGenerate.push({
          str: replaceFileStr(resolve('src', 'useStandalone', 'main.js'), {
            VERSION_FILE_PATH: correctPath(publicPath, 'version.txt')
          }),
          dest: resolveApp('main.js')
        })
      }

      if (this.options.mode === 'webWorker') {
        waitForGenerate.push({
          str: replaceFileStr(resolve('src', 'useWebWorker', 'main.js'), {
            WORKER_FILE_PATH: join(publicPath, 'worker', 'update-popup.js')
          }),
          dest: resolveApp('main.js')
        })

        waitForGenerate.push({
          str: replaceFileStr(
            resolve('src', 'useWebWorker', 'worker', 'update-popup.js'),
            {
              VERSION_FILE_PATH: correctPath(publicPath, 'version.txt')
            }
          ),
          dest: resolveApp('worker', 'update-popup.js')
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
        fs.copySync(resolveApp('worker'), join(outputPath, 'worker'))
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
