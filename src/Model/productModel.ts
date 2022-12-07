import mongoose,{Schema} from "mongoose";

export interface productInstance {
        _id: string,
        name: string,
        brand: string,
        image: string,
        category: string,
        description: string,
        price: string,
        countInStock: string,
        rating: number,
        numReviews: string
}

const productSchema = new Schema({
    name: {type: String},
    brand: {type: String},
    image: {type: String},
    category: {type: String},
    description: {type: String},
    price: {type: String},
    countInStock: {type: String},
    rating: {type: Number},
    numReviews: {type: String},
},
{
    timestamps: true
})

const Product = mongoose.model<productInstance>("Product", productSchema)

export default Product