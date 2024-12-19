import ItemPagePlaceHolder from "./ItemPagePlaceHolder"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from '../../api'
import { BASE_URL } from '../../api'
import { toast } from "react-toastify"

const ItemPage = ({setNumCartItems, numCartItems}) => {

  const { slug } = useParams()
  const [item, setItem] = useState([])
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const cart_code = localStorage.getItem("cart_code")

  const newItem = {cart_code: cart_code, item_id: item.id, quantity: quantity}
  function add_to_cart() {
    api.post("add_to_cart/", newItem).then(res => {
      console.log(res.data.data)
      setNumCartItems(curr => curr + parseInt(quantity))
      (quantity===1 ? 
        toast.success(`Added ${quantity} item to cart!`) : 
        toast.success(`Added ${quantity} items to cart!`))
    })
    .catch(err => {
      console.log(err.message)
    })
  }
    
  useEffect(function() {
    setLoading(true)
    api.get(`item_detail/${slug}`).then(res => {
    console.log(res.data)
    setItem(res.data)
    setLoading(false)
  })

  .catch(err => {
    console.log(err.message)
    setLoading(false)
  })

  }, [])

  if(loading) {
    return <ItemPagePlaceHolder />
  }

  return (
    <div>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={`${BASE_URL}${item.image}`}
                alt="your product"
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">{item.name}</h1>
              <div className="fs-5 mb-5">
              <div className="small">Stock: {item.stock}</div>
              <div className="small">Category: {item.category}</div>
              <div className="small">Flavour: {item.flavour}</div>
                <strong>${item.price}</strong>
              </div>
              <p className="lead">
                {item.description}
              </p>
              <div className="d-flex">
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={add_to_cart}
                >
                  <i className="bi-cart-fill me-1"></i>
                Add to cart
                </button>
                <input
                  type="number"
                  className="form-control ms-2"
                  style={{ width: "50px" }}
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ItemPage
