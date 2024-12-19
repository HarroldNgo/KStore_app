import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import HomePage from "./components/home/HomePage"
import NotFoundPage from "./components/universal/NotFoundPage"
import ItemPage from "./components/items/ItemPage"
import { useState, useEffect } from "react"
import api from "./api"
import CartPage from "./components/cart/CartPage"
import CheckoutPage from "./components/checkout/CheckoutPage"
import LoginPage from "./components/user/LoginPage"
import ProtectedRoute from "./components/universal/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import UserProfilePage from "./components/user/UserProfilePage"
import SignUpPage from "./components/user/SignUpPage"

const App = () => {

  const [numCartItems, setNumCartItems] = useState(0)
  const cart_code = localStorage.getItem("cart_code")

  useEffect(function(){
    if(cart_code){
      api.get(`get_cart_info?cart_code=${cart_code}`).then(res => {
        console.log(res.data)
        setNumCartItems(res.data.num_of_items)
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  }, [])


  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout numCartItems={numCartItems} setNumCartItems={setNumCartItems} />}>
          <Route index element={<HomePage />} />
          <Route path="items/:slug" element={<ItemPage setNumCartItems={setNumCartItems}  numCartItems={numCartItems}/>}/>
          <Route path="cart" element={<CartPage setNumCartItems={setNumCartItems} />} />
          <Route path="checkout" element={<ProtectedRoute><CheckoutPage setNumCartItems={setNumCartItems} /></ProtectedRoute>} />
          <Route path="login" element={<LoginPage setNumCartItems={setNumCartItems} />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
          </Route>

        </Routes>
   
      </BrowserRouter>
    </AuthProvider>
   
  )
}

export default App
