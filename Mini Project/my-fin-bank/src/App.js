import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import UserLogin from './user/UserLogin'
import UserRegister from './user/UserRegister'
import UserHome from './user/UserHome'
import AdminLogin from './admin/AdminLogin'
import AdminRegister from './admin/AdminRegister'
import AdminHome from './admin/AdminHome'
import Bank from './bank';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path='/' element={<Bank />} ></Route>
          <Route path='/user' element={<UserLogin />} ></Route>
          <Route path='/admin' element={<AdminLogin />} ></Route>
          <Route path='/user/register' element={<UserRegister />} ></Route>
          <Route path='/user/home' element={<UserHome />} ></Route>
          <Route path='/admin/register' element={<AdminRegister />} ></Route>
          <Route path='/admin/home' element={<AdminHome />} ></Route>


        </Routes>
      </div>
    </Router>
  );
}

export default App;
