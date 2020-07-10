# Version-Checker

[![Build Status](https://badgen.net/travis/FEMessage/version-checker/master)](https://travis-ci.com/FEMessage/version-checker)
[![NPM Download](https://badgen.net/npm/dm/@femessage/version-checker)](https://www.npmjs.com/package/@femessage/version-checker)
[![NPM Version](https://badge.fury.io/js/%40femessage%2Fversion-checker.svg)](https://www.npmjs.com/package/@femessage/version-checker)
[![NPM License](https://badgen.net/npm/license/@femessage/version-checker)](https://github.com/FEMessage/version-checker/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/version-checker/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Install](#install)
- [How it works](#how-it-works)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Introduction

为了促进用户使用最新版本的系统，避免出现已修复的问题。

[⬆ Back to Top](#table-of-contents)

## Features

检测当前运行的应用是否落后于线上最新版本，是则提醒刷新。

[⬆ Back to Top](#table-of-contents)

## How it works

- 版本号
  - 构建时将版本号写入代码中，另外生成一个版本号文件 version.txt（用于被查询版本号）。
    - 当有新版本构建时，这个文件会被新的版本号替换，因此它始终是最新的版本号文件。
  - 发现版本号比当前应用版本号新时，则提醒「发现新版本可用」。
- 查询版本号
  - 进入系统查询 1 此版本号。
  - 系统正在工作时，每隔 1 小时获取版本号。
  - 系统不在工作时（切换到其他tab/关闭页面），停止获取版本号。
  - 系统页面被激活时，会立马查询 1 次版本号，有 10 秒间隔，在间隔内频繁切换状态不会获取版本号。

[⬆ Back to Top](#table-of-contents)

## Install

```console
yarn add @femessage/version-checker
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
const VersionChecker = require('@femessage/version-checker/nuxt')
const config = {
  build: {
    extend(config) {
      config.plugins.push(new VersionChecker())
    }
  }
}
```

### Vue CLI

```js
// vue.config.js
const VersionChecker = require('@femessage/version-checker')
const config = {
  chainWebpack: config => {
    config.plugin('version-checker').use(VersionChecker)
  }
}
```

仅此而已

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
