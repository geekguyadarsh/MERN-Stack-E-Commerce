const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getAProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//Params
router.param("userId", getUserById);
router.param("productId", getProductById);

//Actual Routes

//Create Routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//Read Routes
router.get("/product/:productId", getAProduct);
router.get("/product/photo/:productId", photo);

//Update Routes
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//Delete Routes
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//listing Router
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
