import styles from "./UserInfo.module.css"
import pic from "../../assets/pic.jpg"
import { useState, useEffect } from "react";
import api from "../../api";
import { toast } from 'react-toastify'

const UserInfo = ({ userInfo }) => {

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

  const userObject = {
    username: username,
    first_name: firstname,
    last_name: lastname,
    phone: phone,
    email: email,
    addresses: {
      city: city,
      state: state,
      address: address,
      zip_code: zipcode,
    },
    card_details: {
      card_number: cardNumber,
      expiration_date: expiryDate,
      cvv: cvv,
    }
  };


  function updateUser(e) {
    e.preventDefault()
    api.patch("update_user/", userObject).then(res => {
      console.log(res.data)
      toast.success("User Info has been updated successfully!")
    })
  }

  return (
    <form onSubmit={updateUser}>
      <div className="row mb-4">
        <div className={`col-md-3 py-3 card ${styles.textCenter}`}>
          <img
            src={pic}
            alt="User Profile"
            className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
          />
          <h4>{`${userInfo.first_name} ${userInfo.last_name}`}</h4>
          <p className="text-muted">{userInfo.email}</p>
          <button type="submit" className="btn  mt-2" style={{ backgroundColor: '#c433d4', color: 'white' }}>Save Changes</button>
        </div>


        <div className="col-md-9">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: '#c433d4', color: 'white' }}>
              <h5>Account Overview</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">

                  <p>
                    <strong>First Name:</strong>
                    <input
                      className="form-control w-75"
                      id="first_name"
                      placeholder="Enter your first name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                    />
                  </p>
                  
                  <p>
                    <strong>Last Name:</strong>
                    <input
                      className="form-control w-75"
                      id="last_name"
                      placeholder="Enter your last name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <strong>Email:</strong>
                    <input
                      className="form-control w-75"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </p>

                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Phone Number:</strong>
                    <input
                      className="form-control w-75"
                      id="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <strong>Username:</strong>
                    <input
                      className="form-control w-75"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </p>

                </div>
              </div>
            </div>
          </div>

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

        </div>



      </div>
    </form>
  )
}

export default UserInfo
