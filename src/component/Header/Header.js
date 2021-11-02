import React, { useContext } from 'react';
import './Header.css';
import product_logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import { HandleSignOut } from '../Login/LoginManager';
import toast from 'react-hot-toast';


const Header = () => {
     const [LoggedInUser, setLoggedInUser] = useContext(userContext);
     const handleLogOut = () => {
          HandleSignOut()
          .then((res) => {
               toast.success('Successfully Sign Out')
               setLoggedInUser(res)
          })
     }
     const LoginStyle = {background: 'green', color: 'white'}
     return (
          <div className="header  ">
               <img src={product_logo} alt="Logo" />
                    <nav>
                         <Link to="/shop"> Shop </Link>
                         <Link to="/rivew"> Order rivew </Link>
                         <Link to="/inventory"> Manage Inventory </Link>
                         {
                              LoggedInUser.IsSignIn ? <Link onClick={handleLogOut} style={LoginStyle}> Log Out </Link> : <Link style={{background: 'red'}}to="/login"> Login </Link>
                         }
                    </nav>
               <div className="search-box">
                    <input placeholder="Search hear" type="text" /><FontAwesomeIcon className='cart-icon' icon={faShoppingCart} />
               </div>
          </div>
     );
};

export default Header;