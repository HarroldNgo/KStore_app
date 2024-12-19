import UserInfo from "./UserInfo"
import OrderHistoryItemContainer from "./OrderHistoryItemContainer"
import { useEffect, useState } from "react"
import api from "../../api"

const UserProfilePage = () => {

  const [userInfo, setUserInfo] = useState({})
  const [orderitems, setOrderitems] = useState([])

  useEffect(function(){
    api.get("user_info")
    .then(res => {
      console.log(res.data)
      setUserInfo(res.data)
      setOrderitems(res.data.items)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])


  return (
    <div className="container my-5">
    {/* Profile Header */}

    <UserInfo userInfo={userInfo}/>
    

    {/* Order History */}
    <OrderHistoryItemContainer orderitems={orderitems} />
    
  </div>
  )
}

export default UserProfilePage
