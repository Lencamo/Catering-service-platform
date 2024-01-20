class Cache {
  setCache(key: string, value: any) {
    wx.setStorageSync(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = wx.getStorageSync(key)
    return value ? JSON.parse(value) : null
  }

  removeCache(key: string) {
    wx.removeStorageSync(key)
  }

  clearCache() {
    wx.clearStorageSync()
  }
}

const wxCache = new Cache()

export { wxCache }
