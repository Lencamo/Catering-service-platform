class Cache {
  setCache(key: string, value: any) {
    uni.setStorageSync(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = uni.getStorageSync(key)
    return value ? JSON.parse(value) : null
  }

  removeCache(key: string) {
    uni.removeStorageSync(key)
  }

  clearCache() {
    uni.clearStorageSync()
  }
}

const wxCache = new Cache()

export { wxCache }
