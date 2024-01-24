## 云开发

### json 数据库

&emsp;&emsp;当创建 仅创建者可读写 的 collection 时，内部不仅会自动产生 `_id`、还会自动产生 `_openid`

### 1、常规集合

- 用户集合（c_user）

> 所有用户可读，仅创建者可读写

```json
{
  "_id": "7027b65465903dce055011740e2671aa",
  "username": "lencamo",
  "password": "f379eaf3c831b04de153469d1bec345e",
  "avatar": {
    "name": "avatar-1703856579787-798556893.jpg",
    "url": "http://localhost:8000/file/7027b65465903dce055011740e2671aa/avatar",
    "mimetype": "image/jpeg",
    "size": "53064"
  }
}
```

- 店铺集合（c_store）

> 所有用户可读，仅创建者可读写

```json
{
  "_id": "b751f280658a7b5d04d2d82d77fdc0c3",
  "storename": "仙之源饭店",
  "storelocal": "上海市徐汇区中山南路789号",
  "storephone": "19273261352",
  "storeintro": "川菜、米线、面条、饺子、早餐",
  "logo": {
    "name": "logo-1703856579787-798556893.png",
    "url": "http://localhost:8000/file/b751f280658a7b5d04d2d82d77fdc0c3/logo",
    "mimetype": "image/png",
    "size": "153125"
  },
  "user_id": "7027b65465903dce055011740e2671aa"
}
```

- 桌号集合（c_table）

> 所有用户可读，仅创建者可读写

```json
{
  "_id": "a72823ff6596d08005deb8093a848baa",
  "tablename": "1号桌",
  "codeName": "code-1704382572893-549775905-1号桌.jpg",
  "codeUrl": "http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/code-1704382572893-549775905-1号桌.jpg",
  "createTime": "2024-01-04 23:36:13",
  "user_id": "7027b65465903dce055011740e2671aa"
}
```

- 类目集合（c_category）

> 所有用户可读，仅创建者可读写

```json
{
  "_id": "0b153f9a6598fca005f3f6c046a67d14",
  "category": "拌饭",
  "createTime": "2024-01-06 11:26:46",
  "updateTime": "2024-01-06 15:08:58",
  "user_id": "7027b65465903dce055011740e2671aa"
}
```

### 2、菜品相关集合

- 菜品单位（c_unit）

> 所有用户可读，仅创建者可读写

```json
{
  "_id": "b751f2806598fd7905fcc4d463234b4b",
  "unitName": "份",
  "user_id": "7027b65465903dce055011740e2671aa"
}
```

- 菜品集合（c_food）

> `{ "read": true, "write": true }`

```json
{
  "_id": "09e78768659784e805defb1d799d4556",
  "foodname": "青椒烧肉",
  "food": {
    "name": "dish-1703856579787-798556893.png",
    "url": "http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/food-1704382572893-549775905-qingjiao.png"
  },
  "foodPrice": "18",
  "onSale": true,
  "updateTime": "2024-01-06 11:26:46",
  "unitname": "盘",
  "category": "炒菜（荤）",
  "user_id": "7027b65465903dce055011740e2671aa"
}
```

### 3、订单相关集合

- 订单集合（c_order）

> 仅创建者可读写（需要一个用户标识 openId）

```json
{
  "_id": "09e78768659784e805defb1d799d4556",
  "_openId": "05de6597fb1d799d4509e7876884e856",
  "dineNumber": 6,
  "tableName": "桌号1",
  "createTime": "2024-01-06 11:26:46", // 下单时间
  "orderNumber": "129473862643068235", // 订单编号（18位）
  "orderStatus": false, // 是否结账（供 加菜功能 使用）

  "moneySum": 48, // 👈
  "totalCount": 3, // 👈

  "menuList": [
    // 第二次点单
    {
      "orderMoneySum": 48, // 👈
      "orderTotalCount": 3, // 👈
      "acceptStatus": false, // 是否接单  💖

      "orderListArr": [
        {
          "foodMoneySum": 20, // 👈
          "foodOrderCount": 2, // 👈
          "isOrder": true, // 👀
          "onSale": true,

          "_id": "7027b654659a81b40610713c218e8206",
          "category": "面食",
          "food": {
            "name": "food-1704870972039-990366337.jpg",
            "url": "http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/food-1704870972039-990366337.jpg"
          },
          "foodPrice": "10",
          "foodname": "长寿面",
          "unitname": "碗",
          "updateTime": "2024-01-10 15:16:10",
          "user_id": "7027b65465903dce055011740e2671aa"
        },
        {
          "foodMoneySum": 28, // 👈
          "foodOrderCount": 1, // 👈
          "isOrder": true, // 👀
          "onSale": true,

          "_id": "a72823ff659d784c0671c72f6782778a",
          "category": "炒菜（荤）",
          "food": {
            "name": "food-1704871160944-782274172.jpeg",
            "url": "http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/food-1704871160944-782274172.jpeg"
          },
          "foodPrice": "28",
          "foodname": "葱香腰花",
          "unitname": "份",
          "updateTime": "2024-01-10 15:19:19",
          "user_id": "7027b65465903dce055011740e2671aa"
        }
      ]
    },
    // 第一次点单
    {
      "orderMoneySum": 0, // 👈
      "orderTotalCount": 0, // 👈

      "orderList": [
        // {…},
        // ……
      ]
    }
  ],
  "user_id": "7027b65465903dce055011740e2671aa"
}
```
