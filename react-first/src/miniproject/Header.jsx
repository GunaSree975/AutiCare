import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className='w-full flex items-center justify-between px-4 py-2 bg-white shadow-md'>
      <div className='flex items-center'>
        <nav className="align-items-center">
          <Link to="/">
            <img src="https://tse2.mm.bing.net/th?id=OIP.uGy-6XJ3jjYcsREquHqV9AHaES&pid=Api&P=0&h=180" alt="Logo" width="150px" height="60px"/>
          </Link>
        </nav>
        <ul className='nav flex gap-6 ml-8'>
          <li className='nav-item'>
            <Link to="" className='nav-link fw-bold'>Home</Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li className='nav-item'>
                <Link to="signup" className='nav-link fw-bold'>Signup</Link>
              </li>
              <li className='nav-item'>
                <Link to="login" className='nav-link fw-bold'>Login</Link>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <Link to="activities" className='nav-link fw-bold'>Activities</Link>
              </li>
              <li className='nav-item'>
                <Link to="progress" className='nav-link fw-bold'>Progress</Link>
              </li>
              <li className='nav-item'>
                <Link to="rewards" className='nav-link fw-bold'>Rewards</Link>
              </li>
              <li className='nav-item'>
                <Link to="resources" className='nav-link fw-bold'>Resources</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default Header
