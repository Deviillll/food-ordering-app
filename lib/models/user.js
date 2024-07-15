import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: [{
      product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product', // Reference to the Product model (assuming you have one)
          required: true
      },
      quantity: {
          type: Number,
          default: 1
      }
  }],
  isVerified: {
    type: Boolean,
    default: false,
    
  },
},
  {
    minimize: false,
  },
  { timestamps: true }
);

const User =mongoose.models.User || mongoose.model("User", userSchema);
export default User;
