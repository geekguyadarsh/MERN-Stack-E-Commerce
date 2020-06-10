const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { gettoken, processPayment } = require("../controllers/payment");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);

//routes
router.get(
  "/payment/client_token/:userId",
  isSignedIn,
  isAuthenticated,
  gettoken
);

router.post(
  "/payment/checkout/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
