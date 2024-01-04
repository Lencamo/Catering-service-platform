## 云开发

### json 数据库

- 用户集合（c_user）

> 所有用户可读，仅创建者可读写

```json
{
  "_id": "09e78768657ebdac039bb45d7f11b487",
  "username": "lencamo",
  "password": "f379eaf3c831b04de153469d1bec345e",
  "avatar": {
    "name": "avatar-1703856579787-798556893.jpg",
    "url": "http://localhost:8000/file/09e78768657ebdac039bb45d7f11b487/avatar",
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
  "user_id": "09e78768657ebdac039bb45d7f11b487",
  "storename": "仙之源饭店",
  "storelocal": "上海市徐汇区中山南路789号",
  "storephone": "19273261352",
  "storeintro": "川菜、米线、面条、饺子、早餐",
  "logo": {
    "name": "logo-1703856579787-798556893.png",
    "url": "http://localhost:8000/file/b751f280658a7b5d04d2d82d77fdc0c3/logo",
    "mimetype": "image/png",
    "size": "153125"
  }
}
```

- 桌号集合（c_table）

> 所有用户可读，仅创建者可读写

```json
{
  "_id": "a72823ff6596d08005deb8093a848baa",
  "tablename": "http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/code-1704382572893-549775905-1号桌.jpg",
  "codeUrl": "1号桌",
  "createTime": "2024-01-04 23:36:13"
}
```
