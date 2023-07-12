const Product = require("../models/product");
const operatorMap = require("../utils/operatorMap");

const getAllProductStatic = async (req, res) => {
	const products = await Product.find({ price: { $gt: 30 } }) // greater than price 30
		.sort("price") // sort by 30
		.select("name price"); // select name and price field

	res.status(200).json({ products, quantity: products.length });
};

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields, numericFilters } = req.body;
	const queryObject = {};

	if (featured) queryObject.featured = featured;

	if (company) queryObject.company = company;

	if (name) {
		/*
			$regex: 提供 regex 方法做字串配對
			$options: 這邊用 i，代表不分大小寫
			詳細用法: https://www.mongodb.com/docs/manual/reference/operator/query/regex/
		*/
		queryObject.name = { $regex: name, $options: "i" };
	}

	if (numericFilters) {
		const regEx = /<|>|>=|=|<|<=/g;

		/*
			把字串處理成能夠讓 MongoDB 做大小比較的格式
		*/

		for (let key in numericFilters) {
			const operator = numericFilters[key].match(regEx)[0];
			const number = numericFilters[key].match(/\d+/)[0];
			queryObject[key] = { [operatorMap[operator]]: number };
		}
	}

	let result = Product.find(queryObject);

	if (sort) {
		/*
		 	按照特定順序排列
		 */
		const sortList = sort.join(" ");
		result = result.sort(sortList);
	} else {
		result = result.sort("createdAt");
	}

	if (fields) {
		/*
		 	拋出特定欄位
		 */
		const fieldsList = fields.join(" ");
		result = result.select(fieldsList);
	}

	// 頁碼
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);

	const products = await result;
	res.status(200).json({ products, quantity: products.length });
};

module.exports = {
	getAllProductStatic,
	getAllProducts,
};
