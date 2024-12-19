import Header from './Header'
import CardContainer from './CardContainer'
import LoadingContainer from '../universal/LoadingContainer'
import api from '../../api'
import { useEffect, useState } from 'react'
import Error from '../universal/Error'
import generateRandomAlphanumeric from '../../CartCode'
import { FaSearch } from "react-icons/fa";

const HomePage = () => {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFlavour, setSelectedFlavour] = useState('');

  const [sortPrice, setSortPrice] = useState('asc');
  const [sortName, setSortName] = useState('asc');

 

  const toggleSortPrice = () => {
    items.sort((a, b) => {
      if (sortPrice === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    })
    setSortPrice(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };
  const toggleSortName = () => {
    items.sort((a, b) => {
      if (sortName === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    })
    setSortName(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const getDistinctCategories = (items) => {
    return Array.from(new Set(items.map(item => item.category)));
  };
  const getDistinctFlavours = (items) => {
    return Array.from(new Set(items.map(item => item.flavour)));
  };
  const categories = getDistinctCategories(items);
  const flavours = getDistinctFlavours(items);

  // Filter items based on search term
  const filteredItems = items.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.flavour.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesFlavour = selectedFlavour ? item.flavour === selectedFlavour : true;

    return matchesSearchTerm && matchesCategory && matchesFlavour;
  });

  useEffect(function () {
    if (localStorage.getItem("cart_code") === null) {
      localStorage.setItem("cart_code", generateRandomAlphanumeric())
    }
  })

  useEffect(function () {
    api.get("items").then(res => {
      console.log(res.data)
      setItems(res.data)
      setLoading(false)
    })

      .catch(err => {
        console.log(err.message)
        setLoading(false)
        setError(err.message)
      })

  }, [])


  return (
    <>
      <Header />
      {error && <Error error={error} />}
      {loading && <LoadingContainer />}
      <div className="d-flex flex-column align-items-center">
        {/* Search bar and filters grouped horizontally */}
        <div className="d-flex mb-3">
          <span className="input-group-text mt-5" style={{ padding: '0.5rem 1rem', borderRadius: '2rem', width: '100%', backgroundColor: "#c433d4" }}>
            <FaSearch style={{ marginRight: '8px' }} />
            <input
              style={{ marginLeft: '5px', width: '250px', marginRight: '20px' }}
              className="search-input form-control"
              type="text"
              placeholder="Search by name or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select ml-2"
              style={{ width: '180px', marginRight: '20px' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              className="form-select ml-2"
              style={{ width: '180px' }}
              value={selectedFlavour}
              onChange={(e) => setSelectedFlavour(e.target.value)}
            >
              <option value="">Select Flavour</option>
              {flavours.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </span>
        </div>

        {/* Sort buttons grouped horizontally */}
        <div className="d-flex mb-3">
          <button style={{ border: '1px solid black', marginRight:'5px', backgroundColor:'#c433d4', color: 'white' }} className='btn' onClick={toggleSortPrice}>
            Price {sortPrice === 'asc' ? '▲' : '▼'}
          </button>
          <button style={{ border: '1px solid black', marginLeft: '5px', backgroundColor:'#c433d4', color: 'white' }} className='btn' onClick={toggleSortName}>
            Name {sortName === 'asc' ? '▲' : '▼'}
          </button>
        </div>
      </div>
      {loading || error != "" || <CardContainer items={filteredItems} />}

    </>
  )
}

export default HomePage
