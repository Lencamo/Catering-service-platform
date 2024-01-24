/// 就是从categoryFoodList中foodList属性中筛选isOrder为true的【foodList中item】
const orderList = [
  {
    foodMoneySum: 20, // 👈
    foodOrderCount: 2, // 👈
    isOrder: true, // 👀
    onSale: true,

    _id: '7027b654659a81b40610713c218e8206',
    category: '面食',
    food: {
      name: 'food-1704870972039-990366337.jpg',
      url: 'http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/food-1704870972039-990366337.jpg'
    },
    foodPrice: '10',
    foodname: '长寿面',
    unitname: '碗',
    updateTime: '2024-01-10 15:16:10',
    user_id: '7027b65465903dce055011740e2671aa'
  },
  {
    foodMoneySum: 28, // 👈
    foodOrderCount: 1, // 👈
    isOrder: true, // 👀
    onSale: true,

    _id: 'a72823ff659d784c0671c72f6782778a',
    category: '炒菜（荤）',
    food: {
      name: 'food-1704871160944-782274172.jpeg',
      url: 'http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/food-1704871160944-782274172.jpeg'
    },
    foodPrice: '28',
    foodname: '葱香腰花',
    unitname: '份',
    updateTime: '2024-01-10 15:19:19',
    user_id: '7027b65465903dce055011740e2671aa'
  }
]
