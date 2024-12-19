import { Link } from "react-router-dom"
import { toast } from 'react-toastify'

const CartSummary = ({ cartTotal, cartItems }) => {


  function checkValidCheckout() {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].quantity > cartItems[i].item.stock) {
        return false;
      }
    }
    return true;
  }


  const subTotal = cartTotal.toFixed(2)
  const tax = (cartTotal * 0.13).toFixed(2)
  const total = (cartTotal * 1.13).toFixed(2)


  return (
    <div className="col-md-4 align-self-start">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Cart Summary</h5>
          <hr />
          <div className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>${subTotal}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Tax:</span>
            <span>${tax}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Total:</span>
            <strong>${total}</strong>
          </div>
          <Link to="/checkout"
            onClick={(e) => {
              console.log(checkValidCheckout())
              if (!checkValidCheckout()) {
                toast.error("One of your items exceeds our current stock. Please try again later.");
                e.preventDefault();
              }
            }}>
            <button
              className="btn btn-primary w-100"
              style={{ backgroundColor: '#c433d4', borderColor: '#c433d4' }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartSummary
