const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2500,
      trim: true,
    },

    price: {
      type: Number,
      maxlength: 32,
      trim: true,
      required: true,
    },

    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
