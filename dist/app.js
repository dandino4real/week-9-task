"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const products_1 = __importDefault(require("./routes/products"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.DATABASE_URL, () => {
    console.log('database connected successfully');
});
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/products', products_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`sever running on http://localhost:${port}`));
