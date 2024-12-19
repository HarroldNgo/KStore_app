import styles from "./PaymentSection.module.css"
import { FaCcPaypal } from "react-icons/fa"
import { useLocation, useNavigate, Link } from "react-router-dom"
import api from "../../api"
import { toast } from 'react-toastify'
import { useState, useEffect } from "react"
import generateRandomAlphanumeric from "../../CartCode";

const PaymentSection = ({ setNumCartItems, cartItems }) => {
  const navigate = useNavigate()
  const cart_code = localStorage.getItem("cart_code")

  function makePayment() {

    api.post("initiate_payment/", { cart_code })
      .then(res => {
        console.log(res.data)
        console.log(localStorage.getItem("cart_code"))
        localStorage.setItem("cart_code", generateRandomAlphanumeric())
        console.log(localStorage.getItem("cart_code"))
        setNumCartItems(0)
        navigate('/')
        toast.success("Credit Card Authorization Successful!\nYour purchase was successful!");
      })

      .catch(err => {
        console.log(err.message)
        toast.error("Credit Card Authorization Failed");
      })


  }

  return (
    <div className="col-md-4">
      <div className={`card ${styles.card}`}>
        <div className="card-header" style={{ backgroundColor: '#c433d4', color: "white" }}>
          <h5>Payment Options</h5>
        </div>
        <div className="card-body">
          <button className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} onClick={makePayment} id="paypal-button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSection
