import NavBar from '../components/universal/NavBar'
import Footer from '../components/universal/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom'

const MainLayout = ({numCartItems, setNumCartItems}) => {
  return (
    <>
    <NavBar numCartItems={numCartItems} setNumCartItems={setNumCartItems} />
    <ToastContainer position='bottom-center' autoClose={3000}/>
    <Outlet />
    <Footer />
    </>
  )
}

export default MainLayout
