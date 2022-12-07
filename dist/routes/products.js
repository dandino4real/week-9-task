"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const router = (0, express_1.default)();
router.post('/create', productController_1.createProducts);
router.get('/getAll', productController_1.getAllProducts);
router.get('/getOne/:id', productController_1.getSingleProduct);
router.patch('/update/:id', productController_1.updateProduct);
router.delete('/delete/:id', productController_1.deleteProduct);
exports.default = router;
