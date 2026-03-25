import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import ProductRoute from './route/product.route.js';
import userRoute from './route/user.route.js'
import cartRoute from './route/cart.route.js';
import paymentRoute from './route/payment.route.js';
import orderRoute from './route/order.route.js';
import contactRoute from './route/contact.route.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "https://monoro-vercel.vercel.app"
  ],
  credentials: true
}));


app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log("Error connected to MongoDB: ", error);
  }
};
connectDB();

// Health check route for Render
app.get("/", (req, res) => {
  res.send("Monoro Backend is running successfully!");
});

// Defining Routes 
app.use("/product",ProductRoute);

app.use("/users",userRoute);
app.use("/cart", cartRoute);
app.use("/payment", paymentRoute);
app.use("/orders", orderRoute);
app.use("/contact", contactRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
