const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, "product name must be provided"],
	},
	price: {
		type: Number,
		require: [true, "product price must be provided"],
	},
	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	createAt: {
		type: Date,
		default: Date.now(),
	},
	company: {
		type: String,
		enum: {
			values: ["ikea", "liddy", "caressa", "marcos"], // enum 驗證，檢查只有陣列裡的這些值可以使用
			message: "{VALUE} is not supported",
		},
	},
});

module.exports = mongoose.model("Product", productSchema);
