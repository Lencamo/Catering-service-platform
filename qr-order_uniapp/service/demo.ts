export function demoApi() {
  return uni.cloud.callFunction({
    name: 'demo',
    data: {
      url: '/demo',
      data: {
        username: 'ren'
      }
    }
  })
}
