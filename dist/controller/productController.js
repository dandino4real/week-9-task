"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAllProducts = exports.createProducts = void 0;
const productModel_1 = __importDefault(require("../Model/productModel"));
const createProducts = async (req, res) => {
    try {
        const { name, image, brand, category, description, price, countInStock, rating, numReviews, } = req.body;
        const check = await productModel_1.default.findOne({ name });
        if (!check) {
            const products = {
                name,
                image,
                brand,
                category,
                description,
                price,
                countInStock,
                rating,
                numReviews,
            };
            const newProduct = await productModel_1.default.create(products);
            res.status(201).json({ message: "Product created successfully",
                newProduct });
        }
        else {
            res.status(500).json({ message: "product already exist" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "badrequest" });
    }
};
exports.createProducts = createProducts;
const getAllProducts = async (req, res) => {
    try {
        const { id } = req.body;
        const products = await productModel_1.default.find({});
        if (products) {
            res.status(200).json({ message: "products retrieved succesfuly", products });
        }
        else {
            res.status(404).json('products does not exist');
        }
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};
exports.getAllProducts = getAllProducts;
const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel_1.default.findOne({ id });
        if (!product) {
            return res.status(404).json({ message: `No product with id:${id}` });
        }
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
    res.json({ id: req.params.id });
};
exports.getSingleProduct = getSingleProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel_1.default.findOneAndUpdate({ id }, req.body, {
            new: true,
        });
        if (!product) {
            res.status(404).json({ id, data: req.body });
        }
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    //res.send('delete tasks from the controller')
    try {
        const { id: taskID } = req.params;
        const product = await productModel_1.default.findOneAndDelete({ _id: taskID });
        if (!product) {
            return res.status(404).json({ message: `No task with id:${taskID}` });
        }
        res
            .status(200)
            .json({ message: `Product with id:${taskID} deleted successfully` });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.deleteProduct = deleteProduct;
