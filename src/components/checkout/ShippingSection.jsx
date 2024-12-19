import OrderItem from "./OrderItem"
import styles from "./OrderSummary.module.css"

const ShippingSection = () => {


  return (
    <div className="col-md-8">
    <div className={`card mb-4 ${styles.card}`}>
      <div className="card-header" style={{ backgroundColor: '#c433d4', color:"white"}}>
        <h5>Shipping Information</h5>
      </div>
      <div className="card-body">

        <div className='px-3' style={{height:"300px", overflow:"auto"}}>

        test

        </div>

       
        <hr />
        <div className="d-flex justify-content-between">
          <h6>Total</h6>
          <h6>some total</h6>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ShippingSection
