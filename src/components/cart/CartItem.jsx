import { BASE_URL } from '../../api'
import api from '../../api'
import { useState } from 'react'
import { toast } from 'react-toastify'
const CartItem = ({item, setCartTotal, cartItems, setNumCartItems, setCartItems}) => {

  const [quantity, setQuantity] = useState(item.quantity)

  const itemData = {quantity:quantity, item_id: item.id}
  const itemId = {item_id: item.id}

  function updateCartItem(){
    api.patch("update_quantity/", itemData).then(res => {
      console.log(res.data)
      toast.success("Cart has been updated successfully!")
      const updatedCartItems = cartItems.map(cartItem => 
        cartItem.id === item.id ? res.data.data : cartItem
      );

      setCartTotal(updatedCartItems.reduce((acc, curr) => acc + curr.total, 0));
      setNumCartItems(updatedCartItems.reduce((acc, curr) => acc + curr.quantity, 0));
      setCartItems(updatedCartItems);

      
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  function deleteCartItem(){
    const confirmDelete = window.confirm("Are you sure you want to remove this item?")
    if(confirmDelete){
      api.post("delete_item/", itemId).then(res => {
        console.log(res.data)
        toast.success("Item has been removed successfully!")

        setCartItems(cartItems.filter(cartItem => (cartItem.id != item.id)))

        setCartTotal(cartItems.filter(cartItem => (
          cartItem.id != item.id
        )).reduce((acc, curr) => acc+curr.total, 0))
  
        setNumCartItems(cartItems.filter(cartItem => (
          cartItem.id != item.id
        )).reduce((acc, curr) => acc+curr.quantity, 0))
      
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  }

  return (
    <div className="col-md-12">
          {/* Cart Items */}
          <div
            className="cart-item d-flex align-items-center mb-3 p-3"
            style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}
          >
            <img
              src={`${BASE_URL}${item.item.image}`}
              alt="Product Image"
              className="img-fluid"
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
            />
            <div className="ms-3 flex-grow-1">
              <h5 className="mb-1">{item.item.name}</h5>
              <p className="mb-0 text-muted">Stock: {item.item.stock}</p>
              <p className="mb-0 text-muted">${item.item.price}</p>
            </div>
            <div className="d-flex align-items-center">
              <input
                type="number"
                min="1"
                className="form-control me-3"
               value={quantity}
               onChange={(e) => setQuantity(e.target.value)}
                style={{ width: '70px' }}
              />
              <button 
              onClick={updateCartItem}
              className="btn btn-sm mx-2" 
               style={{backgroundColor: "#4b3bcb", color:"white"}}>
                Update
                </button>
              <button
               className="btn btn-danger btn-sm"
               onClick={deleteCartItem}
                >Remove</button>
            </div>
          </div>

          {/* Add more cart items here */}
        </div>
  )
}

export default CartItem
