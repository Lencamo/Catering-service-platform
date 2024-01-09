## 云开发

### json 数据库

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
  "updateTime": "2024-01-06 11:26:46",
  "unit_id": "b751f2806598fd7905fcc4d463234b4b",
  "category_id": "0b153f9a6598fca005f3f6c046a67d14",
  "user_id": "7027b65465903dce055011740e2671aa"
}
```
