import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipCode] = useState("");

  const navigate = useNavigate();

  const addressObject = {
    city: city,
    state: state,
    address: address,
    zip_code: zipcode,
  }
  const cardObject = {
    card_number: cardNumber,
    expiration_date: expiryDate,
    cvv: cvv,
  }
  const userObject = {
    username: username,
    first_name: firstname,
    last_name: lastname,
    password: password,
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

  async function createUser(e) {
    e.preventDefault();

    if (password != confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    try {
      const response = await api.post("register_user/", userObject);
      if (response.status == 200) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (err) {
      if (err.status == 400) {
        toast.error("Something went wrong! Check your inputs");
        return;
      }

      toast.error(err.message);
    }
  }
  
  return (
    <div className="login-container my-5">
      <div className="login-card shadow">
        <h2 className="login-title">Create an account.</h2>

        <form onSubmit={createUser}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="firstname"
              className="form-control"
              id="firstname"
              placeholder="Enter your firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="lastname"
              className="form-control"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter your lastname"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Phone Number
            </label>
            <input
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>





          <br />
          <h3 className="subtitle">Billing Information</h3>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Card Number
            </label>
            <input
              className="form-control"
              id="card_number"
              placeholder="Enter card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Expiry Date
            </label>
            <input
              className="form-control"
              id="expiry_Date"
              placeholder="Enter expiry date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              CVV
            </label>
            <input
              className="form-control"
              id="cvv"
              placeholder="Enter cvv"
              value={cvv}
              onChange={(e) => setCVV(e.target.value)}
              required
            />
          </div>




          <br />
          <h3 className="subtitle">Shipping Information</h3>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              City
            </label>
            <input
              className="form-control"
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              State
            </label>
            <input
              className="form-control"
              id="state"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Address
            </label>
            <input
              className="form-control"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Zip Code
            </label>
            <input
              className="form-control"
              id="zipcode"
              placeholder="Enter zip code"
              value={zipcode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create account
          </button>
        </form>
        <div className="login-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
