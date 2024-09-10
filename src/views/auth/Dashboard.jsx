import React from 'react'
import { userAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = userAuthStore((state) => [
    state.isLoggedIn,
    state.user
  ])


  return (
    <>{isLoggedIn()
      ? <div>
        <h1>Dashboard</h1>
        <Link to={'/logout'}>Logout</Link>
      </div>
      : <div>
        <h1>Home Page</h1>
        <div className="d-flex">
          <Link className='btn btn-primary' to={'/register'}>Register</Link> <br />
          <Link className='btn btn-success mx-4 ' to={'/login'}>Login</Link>
        </div>
      </div>
    }
    </>
  )
}

export default Dashboard