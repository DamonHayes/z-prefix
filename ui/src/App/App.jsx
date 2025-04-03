import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Link } from "react-router"
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

  return (
    <>
      <div className='navbar-container'>
        <Hamburger toggled={isOpen} toggle={setOpen} className="hamburger"/>
        <div className='nav-links' hidden={!isOpen}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Inventory">Inventory</Link></li>
            <li><Link to="/login">Log-In</Link></li>
          </ul>
        </div>
        <h1 className='header'>Inventory App</h1>
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
