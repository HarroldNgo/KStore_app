import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import api from "../../api"
import { useEffect, useState } from "react";
import useCartData from "../../hooks/useCartData"
const CartPage = ({setNumCartItems}) => {

  const cart_code = localStorage.getItem("cart_code")

  const {cartItems, setCartItems, cartTotal, setCartTotal} = useCartData()

  if(cartItems.length < 1){
    return (
      <div className="alert alert-danger my-5" role="alert">
      You have no items in your cart!
      </div>
    )
  }

  return (
    <div
      className="container my-3 py-3"
      style={{ height: "80vh", overflow: "scroll" }}>
      <h5 className="mb-4">Shopping Cart</h5>
      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item, i) => (
            <CartItem key={i} item={item} setCartTotal={setCartTotal} cartItems={cartItems} setNumCartItems={setNumCartItems} setCartItems={setCartItems} />
          ))}
        
        </div>

        <CartSummary cartTotal={cartTotal} cartItems={cartItems} />
      </div>
    </div>
  );
};

export default CartPage;
