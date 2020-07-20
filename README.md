# update-popup

[![Build Status](https://badgen.net/travis/FEMessage/update-popup/master)](https://travis-ci.com/FEMessage/update-popup)
[![NPM Download](https://badgen.net/npm/dm/@femessage/update-popup)](https://www.npmjs.com/package/@femessage/update-popup)
[![NPM Version](https://badge.fury.io/js/%40femessage%2Fupdate-popup.svg)](https://www.npmjs.com/package/@femessage/update-popup)
[![NPM License](https://badgen.net/npm/license/@femessage/update-popup)](https://github.com/FEMessage/update-popup/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/update-popup/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Options](#options)
- [Notice](#notice)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Introduction

为了促进用户使用最新版本的系统，避免出现已修复的问题。  
阅读[「检测新版本并提醒刷新-方案」](https://deepexi.yuque.com/docs/share/a9d2b329-79bd-4728-a660-c3a6a0550b59)来了解我们为何会产生这个插件。

[⬆ Back to Top](#table-of-contents)

## Features

检测当前运行的应用是否是最新版本，如若不是，则提醒刷新以使用新版本。

[⬆ Back to Top](#table-of-contents)

## Install

```console
yarn add @femessage/update-popup
```

[⬆ Back to Top](#table-of-contents)

## Usage

你需要通过环境变量 `VERSION` 来传入版本号，后续每次迭代更新只需要修改比当前大的版本号即可。

```env
VERSION=1.0.0
```

### Nuxt.js

```js
// nuxt.config.js
const config = {
  modules: ['@femessage/update-popup/nuxt']
}
```

### Vue CLI

```js
// vue.config.js
const UpdatePopup = require('@femessage/update-popup')
const config = {
  chainWebpack: config => {
    config.plugin('update-popup').use(UpdatePopup)
  }
}
```

就这么简单！

[⬆ Back to Top](#table-of-contents)

## Options

### options.publicPath

- Type: `string`
- Default: `undefined`

一般情况下不需要设置此参数。

publicPath，跟 webpack.config 的 `output.publicPath` 一致。  
何时需要设置此参数请阅读 [环境变量 PUBLIC_PATH](#publicpath) 。

### options.mode

- Type: `'standalone' | 'webWorker'`
- Default: `'standalone'`

#### standalone

标准使用 interval 来检查新版本。

#### webWorker

使用 [Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker) 来检查新版本。

[⬆ Back to Top](#table-of-contents)

### options.inject

- Type: `boolean`
- Default: `true`

是否自动打包到代码中。  
如果设置为`false`需要手动将`@femessage/update-popup/app/main`注入到你的代码中。  
何时需要设置此参数请参阅 [QianKun（乾坤）](#qianKun（乾坤）)。

## Notice

### 环境变量

#### PUBLIC_PATH

- 最终输出文件路径依赖于 [webpack publicPath](https://webpack.docschina.org/configuration/output/#outputpublicpath)。

关于 PUBLIC_PATH 还有一些值得注意的事：

- 如果你的构建产物是通过类似「网关」转发而访问的，即资源在 `assets.com` 但通过 `mydomain.com` 来进行访问。

### QianKun（乾坤）

#### 在子应用中使用

调整配置文件

```diff
# nuxt.config
const config = {
-  modules: ['@femessage/update-popup/nuxt']
+  modules: [['@femessage/update-popup/nuxt'], { inject: false }]
}

# vue cli
const config = {
  chainWebpack: config => {
    config.plugin('update-popup').use(UpdatePopup, [
+     { inject: false }
    ])
  }
}
```

最后在你的**子应用**入口文件添加

```diff
+ import '@femessage/update-popup/app/main'
```

[⬆ Back to Top](#table-of-contents)

## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

Please refer to our [contributing guide](https://github.com/FEMessage/.github/blob/master/CONTRIBUTING.md).

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
