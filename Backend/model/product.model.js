import mongoose from "mongoose";

export const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    category: { type: String, enum: ['Men', 'Women', 'Kids'] }, // Nayi Category
    subCategory: String, // Purani Category yahan aayegi
    sizes: [String],
    rating: { type: Number, default: 4.5 },
    stock: { type: Number, default: 10 }
});
const Product = mongoose.model("Product",productSchema);

export default Product;