/**
 * @typedef {import('./utils').PathLike} PathLike
 * @typedef {import('./utils').Dir} Dir
 * @typedef {{str: string, dest: PathLike}} WaitForGenerate
 * @typedef {import('./utils').obj} obj
 */

/**
 * @typedef {{
 *  publicPath?: string
 *  mode?: 'standalone' | 'webWorker'
 *  inject?: boolean
 *  envKey?: string
 * }} UpdatePopupOptions
 */

const fs = require('fs-extra')
const _get = require('lodash.get')
const {
  resolveWebpackEntry,
  replaceStr,
  correctPath,
  resolve,
  join
} = require('./utils')

/** @type {(...dir: Dir[]) => PathLike} */
const resolveApp = (...dir) => resolve('app', ...dir)
/** @type {(filePath: PathLike) => string} */
const readFile = filePath => fs.readFileSync(filePath, 'utf8')

const NAME = 'femessage-update-popup'

class UpdatePopup {
  /** @param {UpdatePopupOptions} options */
  constructor(options) {
    this.options = Object.assign(
      {
        publicPath: '',
        mode: 'standalone',
        inject: true, // 自动注入到 webpack.entry
        envKey: 'UPDATE_POPUP_VERSION'
      },
      options
    )

    this.version = process.env[this.options.envKey] || '1.0.0'
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

      if (this.options.mode === 'standalone') {
        this.generateFile(
          resolveApp('main.js'),
          readFile(resolve('src', 'useStandalone', 'main.js')),
          {VERSION_FILE_PATH: correctPath(publicPath, 'version.txt')}
        )
      }

      if (this.options.mode === 'webWorker') {
        this.generateFile(
          resolveApp('main.js'),
          readFile(resolve('src', 'useWebWorker', 'main.js')),
          {WORKER_FILE_PATH: join(publicPath, 'worker', 'update-popup.js')}
        )

        this.generateFile(
          resolveApp('worker', 'update-popup.js'),
          readFile(resolve('src', 'useWebWorker', 'worker', 'update-popup.js')),
          {VERSION_FILE_PATH: correctPath(publicPath, 'version.txt')}
        )
      }
    })

    // 复制文件到 webpack 输出目录
    compiler.hooks.done.tap(NAME, () => {
      const outputPath = _get(compiler, 'outputPath', '')

      if (this.options.mode === 'webWorker') {
        fs.copySync(resolveApp('worker'), join(outputPath, 'worker'))
      }

      // 版本号文件
      fs.outputFileSync(join(outputPath, 'version.txt'), this.version)
    })
  }

  /** @type {(dest: PathLike, content: string, extraReplacement: obj) => void} */
  generateFile(dest = '', content = '', extraReplacement = {}) {
    console.log(this)
    fs.outputFileSync(
      dest,
      replaceStr(content, {
        envKey: this.options.envKey,
        currentVersion: this.version,
        ...extraReplacement
      })
    )
  }
}

module.exports = UpdatePopup
