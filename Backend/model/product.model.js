import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    description: String,
    rating: { type: Number, default: 4.5 },
    stock: { type: Number, default: 10 }
});

const Product = mongoose.model("Product",productSchema);

export default Product;