export function demoApi() {
  return wx.cloud.callFunction({
		name: 'demo',
		data: {
			url: '/demo',
			data: {
				username: 'ren'
			}
		}
	})
}