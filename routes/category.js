const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const {
  getCategoryById,
  createCategory,
  getAllCategory,
  getACategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");

//Params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routes go here
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//read route
router.get("/category/:categoryId", getACategory);
router.get("/categories", getAllCategory);

//Update routes
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//dekete routes
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
