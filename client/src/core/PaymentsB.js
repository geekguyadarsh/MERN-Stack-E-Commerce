import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createOrder } from "./helper/orderHelper";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import { isAuthenticated } from "../auth/helper";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import DropIn from "braintree-web-drop-in-react";

const PaymentsB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  var userId = isAuthenticated() && isAuthenticated().user._id;
  var token = isAuthenticated() && isAuthenticated().token;

  const getToken = () => {
    getMeToken(userId, token).then((info) => {
      console.log(info);
      if (info.error) {
        setInfo({ ...info, error: info.err });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const cartValue = () => {
    var amount = 0;
    products.map((p) => {
      return (amount = amount + p.price);
    });
    return amount;
  };

  const onPruchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: cartValue(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS ", response);
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => console.log("Did we got a crash?"));
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ ...info, success: false, loading: false, error: error });
          console.log("PAYMENT FAILED ", error);
        });
    });
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && isAuthenticated() ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPruchase}>
              Proceed to pay
            </button>
          </div>
        ) : (
          <Link to="/signin">
            <button className="btn btn-warning">Signin To Proceed</button>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3>Your payable amount is ${cartValue()}</h3>
      {showDropIn()}
    </div>
  );
};
export default PaymentsB;
