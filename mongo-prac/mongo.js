const MongoClient = require("mongodb").MongoClient;

const url =
    "mongodb+srv://nitishchy007:Nitish1997@cluster0.rhlukvp.mongodb.net/products_test?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
    };
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db();
        const result = db.collection("products").insertOne(newProduct);
    } catch (error) {
        return res.status(404).json({ message: "Could not store data." });
    } finally {
        client.close();
    }

    return res.staus(201).json(newProduct);
};

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    let products;
    try {
        await client.connect();
        const db = client.db();
        products = await db.collection("products").find().toArray();
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Could perform the query at this time" });
    } finally {
        client.close();
    }
    return res.status(200).json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
