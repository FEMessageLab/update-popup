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

你需要通过环境变量 `UPDATE_POPUP_VERSION` 来传入版本号，后续每次迭代更新只需要修改比当前大的版本号即可。

```bash
# .env
UPDATE_POPUP_VERSION=1.0.0
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
    config.plugin('femessage-update-popup').use(UpdatePopup)
  }
}
```

### Poi

```js
// poi.config.js
const config = {
  plugins: [
    {
      resolve: require.resolve('@femessage/update-popup/poi'),
      options: {}
    }
  ]
}
```

就这么简单！

[⬆ Back to Top](#table-of-contents)

## Options

### options.publicPath

- Type: `string`
- Default: `webpackConfig.output.publicPath`
- Reference: [webpack publicPath](https://webpack.docschina.org/configuration/output/#outputpublicpath)

使用独立的 publicPath，一般情况下不需要设置此参数。  
何时需要设置此参数请阅读 [环境变量 PUBLIC_PATH](#publicpath) 。

### options.mode

- Type: `'standalone' | 'webWorker'`
- Default: `'standalone'`

#### standalone

标准模式。

#### webWorker

使用 [Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker) 来检查新版本。

[⬆ Back to Top](#table-of-contents)

### options.inject

- Type: `boolean`
- Default: `true`

是否自动添加到 webpack 入口文件，一般情况下不需要设置此参数。  
如果设置为 `false` 需要手动将 `@femessage/update-popup/app/main` 注入到你的代码中。  
何时需要设置此参数请参阅 [Notice.QianKun（乾坤）](#qiankun乾坤)。

### options.envKey

- Type: `string`
- Default: `'UPDATE_POPUP_VERSION'`

指定获取环境变量的 key 。e.g. `process.env.UPDATE_POPUP_VERSION=1.0.0`

## Notice

### 环境变量

#### PUBLIC_PATH

如果你的构建产物是通过类似「网关」转发而访问的，即资源在 `assets.com` 但通过 `mydomain.com` 来进行访问。

### QianKun（乾坤）

此插件会自动生成一个普通的 js 文件并添加到 webpack 入口文件中，  
但由于子应用的入口文件需要 **[导出生命周期钩子](https://qiankun.umijs.org/zh/guide/getting-started#1-%E5%AF%BC%E5%87%BA%E7%9B%B8%E5%BA%94%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)** 的要求，  
因此需要禁止自动添加入口文件，则做如下的调整：

#### 在子应用中使用

调整配置文件

```diff
# nuxt.config.js
const config = {
-  modules: ['@femessage/update-popup/nuxt']
+  modules: [['@femessage/update-popup/nuxt'], { inject: false }]
}

# vue.config.js
const config = {
  chainWebpack: config => {
    config.plugin('update-popup').use(UpdatePopup, [{
+     inject: false
    }])
  }
}

# poi.config.js
const config = {
  plugins: [
    {
      resolve: require.resolve('@femessage/update-popup/poi'),
      options: {
+       inject: false
      }
    }
  ]
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
