import { useState } from 'react'
import './index.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './Page/Login-Page/Login'
import Register from './Page/Register-Form/Register'
import LandingPage from './Page/Landing-Page/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
