import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import About from './Components/About';
import Admin from './Components/Admin';
import Dashboard from './Components/Admin/Dashboard';
import User from './Components/Admin/User';
import Member from './Components/Admin/Member';
import Books from './Components/Admin/Books';
import Borrow from './Components/Admin/Transactions/Borrow';
import ViewBorrow from './Components/Admin/Transactions/ViewBorrow';
import Private from './Routes/Private';

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/admin' element={<Admin />} />
          
          <Route element={<Private />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/user' element={<User />} />
            <Route path='/admin/borrow' element={<Borrow />} />
            <Route path='/admin/view_borrow' element={<ViewBorrow />} />
            <Route path='/admin/books' element={<Books />} />
            <Route path='/admin/members' element={<Member />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App