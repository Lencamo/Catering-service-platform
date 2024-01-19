export function getSelectorTop(selector: string, callback: any) {
	const query = wx.createSelectorQuery()
	query.select(selector).boundingClientRect()
	
	query.exec(res => {
		callback(res)
	})
}

export function getSelectorAllTop(selector: string, callback: any) {
	const query = wx.createSelectorQuery()
	query.selectAll(selector).boundingClientRect()
	
	query.exec(res => {
		callback(res)
	})
}