import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { API } from "../backend";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import PaymentsB from "./PaymentsB";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadCartSection = (products) => {
    return (
      <div>
        <div className="mb-4 text-left">
          <h3>Product cart section</h3>
        </div>
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-6 mb-4">
              <Card
                product={product}
                removeFromCart={true}
                addtoCart={false}
                setReload={setReload}
                reload={reload}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const checkoutSection = () => {
    return (
      <div>
        <h3>Cart checkout section</h3>
      </div>
    );
  };

  return (
    <Base
      title="Cart Page"
      description="you can checkout your desired products here"
    >
      <div className="row text-center mb-3 ">
        <div className="col-8">
          {products.length > 0 ? (
            loadCartSection(products)
          ) : (
            <h3>Your Cart is empy</h3>
          )}
        </div>
        <div className="col-4">
          <div className="cart-container m-5">
            <div className="row row mr-3 ml-3">
              <StripeCheckout products={products} setReload={setReload} />
              {/*<PaymentsB products={products} setReload={setReload} />*/}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};
export default Cart;
