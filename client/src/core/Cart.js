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
        <h2>Cart product section</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const checkoutSection = () => {
    return (
      <div>
        <h2>Cart checkout section</h2>
      </div>
    );
  };

  return (
    <Base
      title="Cart Page"
      description="you can checkout your desired products here"
    >
      <div className="row text-center mb-3 ">
        <div className="col-6">
          {products.length > 0 ? (
            loadCartSection(products)
          ) : (
            <h3>Your Cart is empy</h3>
          )}
        </div>
        <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
          <PaymentsB products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};
export default Cart;
