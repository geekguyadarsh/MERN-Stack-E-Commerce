import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom/cjs/react-router-dom";
import StripeCheckoutEasy from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const cartValue = () => {
    let amount = 0;
    products.map((p) => {
      return (amount = amount + p.price);
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((err) => console.log(err));
  };

  const showStripeCheckout = () => {
    return isAuthenticated() ? (
      <StripeCheckoutEasy
        stripeKey="YOUR_KEY_HERE"
        token={makePayment}
        name="Payment Section"
        amount={cartValue() * 100}
        billingAddress
        shippingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutEasy>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin To Proceed</button>
      </Link>
    );
  };

  return (
    <div>
      <h2 className="text-white">Stripe checkout amount is {cartValue()}</h2>
      {showStripeCheckout()}
    </div>
  );
};

export default StripeCheckout;
