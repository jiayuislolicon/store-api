require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

// How to exit in Node.js：https://stackoverflow.com/questions/5266152/how-to-exit-in-node-js
// 倒入資料的範例

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		await Product.deleteMany(); // 刪除全部的資料
		await Product.create(jsonProducts); // 加入想新增的多筆資料
		console.log("create data successfully.");
		process.exit(0); // 執行結束且成功
	} catch (error) {
		console.error(error);
		process.exit(1); // 執行失敗
	}
};

start();
