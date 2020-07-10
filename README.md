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
- [Usage](#usage)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Introduction

[⬆ Back to Top](#table-of-contents)

## Features

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
