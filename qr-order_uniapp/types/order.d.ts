export interface ICategoryList {
	_id: string
	category:string
	createTime: string
	updateTime: string
	user_id: string
	foodList?: any[]
}

export interface IFoodList {
	_id: string
	category:string
	food: {
		name: string
		url: string
	}
	foodPrice: string
	foodname: string
	onSale: Boolean
	unitname: string
	updateTime: string
	user_id: string
}