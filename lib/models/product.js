import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },
        price: {
        type: Number,
        required: true,
        },
       
        imageUrl: {
        type: String,
        required: true,
        },
        category: {
        type: String,
        required: true,
        },
    },
  
    { timestamps: true }
    );
    const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

    export default Product;