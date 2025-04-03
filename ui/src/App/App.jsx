import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Link } from "react-router"
import { useLocalStorage } from '@uidotdev/usehooks'
import Hamburger from 'hamburger-react'
import './App.css'
import Home from "../Home/Home"
import Login from "../LogIn/Login"
import CreateUser from '../CreateUser/CreateUser'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import Inventory from "../Inventory/Inventory"
import InventoryUser from '../Inventory/InventoryUser'
import ItemDetail from '../Inventory/Item Details'


function App() {
  const [count, setCount] = useState(0)
  const [isOpen, setOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn')


  return (
    <>
      <div className='navbar-container'>
        <Hamburger toggled={isOpen} toggle={setOpen} className="hamburger"/>
        <div className='nav-links' hidden={!isOpen}>
          <ul>
            <li><Link to="/Inventory">Global Inventory</Link></li>
            <li><Link to={loggedIn ? `/Inventory/${loggedIn.id}` : ""} hidden={!loggedIn} >Your Inventory</Link></li>
            <li><Link to="/login" hidden={loggedIn}>Log-In</Link></li>
            <li><Link onClick={() => {setLoggedIn(null)}} hidden={!loggedIn} to='/login'>Log Out</Link></li>
          </ul>
        </div>
        <h1 className='header' hidden={loggedIn}>Inventory App</h1>
        <h1 className='header' hidden={!loggedIn}>{loggedIn ? loggedIn.user_name : ""}</h1>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/CreateUser' element={<CreateUser />} />
        <Route path='/Inventory' element={<Inventory />}/>
        <Route path="/Inventory/:id" element={<InventoryUser/>} />
        <Route path="/Inventory/item/:id" element={<ItemDetail />} />
      </Routes>
    </>
  )
}

export default App
