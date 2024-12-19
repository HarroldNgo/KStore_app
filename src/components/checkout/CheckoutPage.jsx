import OrderSummary from "./OrderSummary"
import PaymentSection from "./PaymentSection"
import ShippingSection from "./ShippingSection"
import useCartData from "../../hooks/useCartData"
import { useEffect, useState } from "react"
import api from "../../api"

const CheckoutPage = ({setNumCartItems}) => {
  const {cartItems, setCartItems, cartTotal, setCartTotal} = useCartData()
  const [userInfo, setUserInfo] = useState({})

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipCode] = useState("");

  useEffect(() => {
    if(userInfo){
      setUsername(userInfo.username || "");
      setFirstname(userInfo.first_name || "");
      setLastname(userInfo.last_name || "");
      setPhone(userInfo.phone || "");
      setEmail(userInfo.email || "");

      if (userInfo.user_card_details?.length > 0) {
        setCardNumber(userInfo.user_card_details[0].card_number || "");
        setExpiryDate(userInfo.user_card_details[0].expiration_date || "");
        setCVV(userInfo.user_card_details[0].cvv || "");
      }

      if (userInfo.user_addresses?.length > 0) {
        setCity(userInfo.user_addresses[0].city || "");
        setState(userInfo.user_addresses[0].state || "");
        setAddress(userInfo.user_addresses[0].address || "");
        setZipCode(userInfo.user_addresses[0].zip_code || "");
      }
    }
  }, [userInfo])

  useEffect(function(){
    api.get("user_info")
    .then(res => {
      console.log(res.data)
      setUserInfo(res.data)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])

  return (
    <div className="container my-3">
      {userInfo.user_addresses && userInfo.user_addresses.map((user_address, i) => (
            <div key={i} className="card my-2">
              <div className="card-header" style={{ backgroundColor: '#c433d4', color: 'white' }}>
                <h5>Shipping Information #{i + 1}</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">

                    <p>
                      <strong>City:</strong>
                      <input
                      className="form-control w-75"
                      id="city"
                      placeholder="Enter your city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                    </p>
                    <p>
                      <strong>State:</strong>
                      <input
                      className="form-control w-75"
                      id="state"
                      placeholder="Enter your state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Address:</strong>
                      <input
                      className="form-control w-75"
                      id="address"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    </p>
                    <p>
                      <strong>Zip Code:</strong>
                      <input
                      className="form-control w-75"
                      id="zipcode"
                      placeholder="Enter your zip code"
                      value={zipcode}
                      onChange={(e) => setZipCode(e.target.value)}
                      required
                    />
                    </p>

                  </div>
                </div>
              </div>
            </div>
          ))}
          {userInfo.user_card_details && userInfo.user_card_details.map((card, i) => (
            <div key={i} className="card my-2">
              <div className="card-header" style={{ backgroundColor: '#c433d4', color: 'white' }}>
                <h5>Billing Information #{i + 1}</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">

                    <p>
                      <strong>Card Number:</strong>
                      <input
                      className="form-control w-75"
                      id="cardnumber"
                      placeholder="Enter your card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                    </p>
                    <p>
                      <strong>Expiration Date:</strong>
                      <input
                      className="form-control w-75"
                      id="expiriationdate"
                      placeholder="Enter your expiration date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      required
                    />
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>CVV:</strong>
                      <input
                      className="form-control w-75"
                      id="cvv"
                      placeholder="Enter your CVV"
                      value={cvv}
                      onChange={(e) => setCVV(e.target.value)}
                      required
                    />
                    </p>

                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="row">
        <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
        <PaymentSection setNumCartItems={setNumCartItems} cartItems={cartItems} />
      </div>
    </div>
  )
}

export default CheckoutPage







