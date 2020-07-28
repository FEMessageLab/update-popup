/** @type {(newVersion: string, currentVersion: string) => boolean}*/
export function compareVersion(newVersion, currentVersion) {
  if (newVersion && currentVersion) {
    const n = newVersion.split('.')
    const c = currentVersion.split('.')

    for (let i = 0; i <= n.length; i++) {
      if (Number(n[i]) > Number(c[i])) return true
    }
  }

  return false
}