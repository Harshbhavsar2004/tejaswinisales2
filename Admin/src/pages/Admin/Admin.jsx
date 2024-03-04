import React from 'react'
import './admin.css'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import Product from '../../components/product/Product'
import ListProduct from '../../components/Listproduct/ListProduct'
import Order from '../../components/Orders/Order'
import Contact from '../../components/Contact/Contact'
const Admin = () => {
  return (
    <div className='Admin'>
      <Sidebar />
      <Routes>
        <Route path='/addproduct' element={<Product />} />
        <Route path='/listproduct' element={<ListProduct/>} />
        <Route path='/order' element={<Order/>}  />
        <Route path='/Contact' element={<Contact/>}  />
      </Routes>
    </div>
  )
}

export default Admin