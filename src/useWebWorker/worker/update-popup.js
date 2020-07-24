// worker 只负责轮询获取版本号
// 获取的版本号会通过 `postMessage` 告诉主线程
let interval

const startInterval = data => {
  interval = setInterval(fetchVersion, data.interval)
}

const stopInterval = () => clearInterval(interval)

const cmd = {
  immediate: fetchVersion,
  startInterval,
  stopInterval,
  close: () => self.close()
}

self.onmessage = event => {
  const data = event.data
  const fn = cmd[data.cmd] || (() => {})
  fn(data)
}

function fetchVersion() {
  fetch('{{VERSION_FILE_PATH}}' + '?_=' + Date.now())
    .then(res => res.text())
    .then(version => {
      self.postMessage({version})
    })
}
