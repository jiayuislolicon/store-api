require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (_, res) => {
	res.send("<h1>Store API: /api/products</h1>");
});

app.use("/api/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`Server is listening port ${port}...`));
	} catch (error) {
		console.error(error);
	}
};

start();
