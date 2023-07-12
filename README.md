# store-api

依然是練習筆記，Express + Mongoose 完成的店家產品 api

### 開啟 server

```
yarn start
```

### 加入假資料

```
node populate.js
```

### .env 配置

```
MONGO_URI=
PORT=
```

### GET /api/product/static

獲得大於 30 塊錢的產品

#### response

```
{
    "products": [
        {
            "_id": "64ae3daa464eb4ab5eac5c49",
            "name": "accent chair",
            "price": 25,
            "featured": false,
            "rating": 4,
            "createAt": "2023-07-12T05:44:07.221Z",
            "company": "marcos",
            "__v": 0
        }
    ],
    "quantity": 1
}
```

### GET /api/product

可自訂較多查詢與分頁功能

#### query

```
?page=1&limit=10
```

#### body

```
{
    featured: boolean,
    company: "ikea" | "liddy" | "caressa" | "marcos",
    name: string,
    numericFilters: { price: "< 30", rating: "= 2" },
    sort: [<fieldName>, ...],
    fields: [<fieldName>, ...],
}
```

#### response

```
{
    "products": [
        {
            "_id": "64ae3daa464eb4ab5eac5c49",
            "name": "accent chair",
            "price": 25,
            "featured": false,
            "rating": 4,
            "createAt": "2023-07-12T05:44:07.221Z",
            "company": "marcos",
            "__v": 0
        }
    ],
    "quantity": 1
}
```
