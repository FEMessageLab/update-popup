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
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Introduction

为了促进用户使用最新版本的系统，避免出现已修复的问题。  
阅读[「检测新版本并提醒刷新-方案」](https://deepexi.yuque.com/docs/share/a9d2b329-79bd-4728-a660-c3a6a0550b59)来了解我们为何会产生这个插件。

[⬆ Back to Top](#table-of-contents)

## Features

检测当前运行的应用是否落后于线上最新版本，是则提醒刷新以使用新版本。

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
const UpdatePopup = require('@femessage/update-popup/nuxt')
const config = {
  modules: ['@femessage/update-popup/nuxt'],
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
