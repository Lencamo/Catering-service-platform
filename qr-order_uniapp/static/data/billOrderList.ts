const billOrderList = {
  _id: '09e78768659784e805defb1d799d4556',
  _openId: '05de6597fb1d799d4509e7876884e856',
  dineNumber: 6,
  tableName: '桌号1',
  createTime: '2024-01-06 11:26:46', // 下单时间
  orderNumber: '129473862643068235', // 订单编号（18位）
  orderStatus: false, // 是否结账（供 加菜功能 使用）

  moneySum: 48, // 👈
  totalCount: 3, // 👈

  menuList: [
    // 第二次点单
    {
      orderMoneySum: 48, // 👈
      orderTotalCount: 3, // 👈
      acceptStatus: false, // 是否接单 <----💖---->

      orderListArr: [
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
    },
    // 第一次点单
    {
      orderMoneySum: 0, // 👈
      orderTotalCount: 0, // 👈

      orderList: [
        // {…},
        // ……
      ]
    }
  ],
  user_id: '7027b65465903dce055011740e2671aa'
}
