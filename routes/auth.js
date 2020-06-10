var express = require("express");
var router = express.Router();

const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    check("email").isEmail().withMessage("email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("must be at least 5 chars long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("email is required"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("password field is required"),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.send("A protected route");
});

module.exports = router;
