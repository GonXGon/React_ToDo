import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar-container'>
        <div className='navbar-logo'>
            <h1>Logo</h1>
        </div>
        <div className='navbar-links'>
            <ul className='navbar-list'>
                <li><a href='/'>Home</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar