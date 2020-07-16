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
  close: () => self.close(),
}

self.onmessage = event => {
  const data = event.data
  const fn = cmd[data.cmd] || (() => {})
  fn(data)
}

function fetchVersion() {
  const params = new URLSearchParams({
    // 避免出现缓存情况
    _: '' + Date.now(),
  })

  fetch('{{VERSION_FILE_PATH}}' + '?' + params)
    .then(res => res.text())
    .then(ver => {
      self.postMessage({version: (ver || '').trim()})
    })
}
