require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");

//My Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");
const paymentRoutes = require("./routes/payment.js");

// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  });

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paymentRoutes);

//ports
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`the app is running at port ${port}`);
});
