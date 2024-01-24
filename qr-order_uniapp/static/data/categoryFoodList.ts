const categoryFoodList = {
  code: 0,
  message: '获取菜品类目菜品列表数据成功！',
  data: {
    orderMoneySum: 0, // 👈
    orderTotalCount: 0, // 👈

    categoryFoodList: [
      {
        categoryOrderCount: 0, // 👈

        _id: 'a72823ff6598fcd6061074963100971e',
        category: '卷饼',
        createTime: '2024-01-06 15:09:52',
        foodList: [
          {
            foodMoneySum: 0, // 👈
            foodOrderCount: 0, // 👈
            isOrder: false, // 👈
            onSale: false, // 💡

            _id: '7027b654659a816806106824469b4e0a',
            category: '卷饼',
            food: {
              name: 'food-1704870561998-740358837.jpg',
              url: 'http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/food-1704870561998-740358837.jpg'
            },
            foodPrice: '7.5',
            foodname: '鸡蛋灌饼',
            unitname: '个',
            updateTime: '2024-01-20 13:44:39',
            user_id: '7027b65465903dce055011740e2671aa'
          }
          // {…},
          // ……
        ],
        updateTime: null,
        user_id: '7027b65465903dce055011740e2671aa'
      }
      // {…},
      // ……
    ]
  }
}
