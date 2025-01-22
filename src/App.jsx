import React from 'react'
import HomePage from './components/HomePage'
import {BrowserRouter,Routes,Route,Router}from 'react-router-dom'
import NavBar from './components/NavBar'
import Signup from './components/signup'
import Login from './components/login'

function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      
      
      </BrowserRouter>
    </div>
  )
}

export default App