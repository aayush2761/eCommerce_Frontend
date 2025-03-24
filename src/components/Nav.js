import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FreeLogo from './Free.png'; 

const Nav = () => {
    const auth = (() => {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user'); // Clear invalid data
            return null;
        }
    })();

    const navigate = useNavigate();

    const logout = () => {
        try {
            localStorage.clear();
            navigate('/signup');
        } catch (error) {
            console.error('Error during logout:', error);
            navigate('/signup');
        }
    };

    return (
        <div className="logo-wrapper">
           <div >
               <img alt="logo" className="logo" src={FreeLogo} />
             </div>
            
            {auth ? (
                <ul className="nav-ul">
                    <li><Link to="/">Product</Link></li>
                    <li><Link to="/add">Add product</Link></li>
                    {/* <li><Link to="/update">Update Product</Link></li> */}
                    
                    
                    {/* Using <button> for logout to avoid Link navigation conflict */}
                    <li>
                        <button onClick={logout} className="logout-btn">
                            Logout ({auth.name})
                        </button>
                    </li>
                </ul>
            ) : (
                <ul className="nav-ul">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Nav;