import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Login from './views/auth/Login'
import Logout from './views/auth/Logout'

import Register from './views/auth/Register'
import Dashboard from './views/auth/Dashboard'
import ForgotPassword from './views/auth/ForgotPassword'
import CreatePassword from './views/auth/CreatePassword'
import StoredHeader from './views/base/StoredHeader'
import StoredFooter from './views/base/StoredFooter'
import MainWrapper from './layout/MainWrapper'
import Products from './views/store/Products'
import ProductDetail from './views/store/ProductDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <StoredHeader />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/create-new-password' element={<CreatePassword />} />

        {/* Store Components */}

        <Route path='/' element={<Products />} />
        <Route path='/detail/:slug/' element={<ProductDetail />} />


      </Routes>
      {/* <MainWrapper>
      </MainWrapper> */}
      <StoredFooter />
    </BrowserRouter>
  )
}

export default App
