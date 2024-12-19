import OrderItem from "./OrderItem"
import styles from "./OrderSummary.module.css"

const OrderSummary = ({cartItems, cartTotal}) => {
  const total = (cartTotal * 1.13).toFixed(2)
  const tax = (cartTotal * 0.13).toFixed(2)

  return (
    <div className="col-md-8">
    <div className={`card mb-4 ${styles.card}`}>
      <div className="card-header" style={{ backgroundColor: '#c433d4', color:"white"}}>
        <h5>Cart Summary</h5>
      </div>
      <div className="card-body">

        <div className='px-3' style={{height:"300px", overflow:"auto"}}>

        {cartItems.map(cartItem => <OrderItem key={cartItem.id} cartItem={cartItem} />)}


        </div>

       
        <hr />
        <div className="d-flex justify-content-between">
          <h6>Subtotal</h6>
          <h6>${cartTotal}</h6>
        </div>
        <div className="d-flex justify-content-between">
          <h6>Shipping & Handling</h6>
          <h6>$0.00</h6>
        </div>
        <div className="d-flex justify-content-between">
          <h6>Tax</h6>
          <h6>${tax}</h6>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <h6>Total</h6>
          <h6>${total}</h6>
        </div>
      </div>
    </div>
  </div>
  )
}

export default OrderSummary
