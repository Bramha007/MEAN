const mongoose = require("mongoose");
const Product = require("./models/products");

const url =
    "mongodb+srv://nitishchy007:Nitish1997@cluster0.rhlukvp.mongodb.net/products_test?retryWrites=true&w=majority";

mongoose
    .connect(url)
    .then(() => console.log("Connected to the Database"))
    .catch(() => console.log("Some Error"));

const createProduct = async (req, res, next) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
    });

    const result = await newProduct.save();
    res.json(result);
};

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec();
    return res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
