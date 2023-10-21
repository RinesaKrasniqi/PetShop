import './user-headercss.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const handleLogout = async () => {
  try {
    const response = await fetch('/logout', {
      method: 'GET',
      credentials: 'include', 
    });

    if (response.ok) {
      window.location.href = '/login';
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

function UserHeader() {
  const [cartCount, setCartCount] = useState(0);
const Client_id = Cookies.get('Client_id');

useEffect(() => {
  try {
    const Client_id = Cookies.get('Client_id');
    console.log('client_id',Client_id);
    axios.get(`http://localhost:5000/cartcount/${Client_id}`)
    .then((response) => {
      const count = response.data.count[0].ProductCount; 
      setCartCount(count);
    })
    .catch((error) => {
      console.error('API request failed:', error);
    });
  

  } catch (error) {
    console.error(error);
  }
},[]);


    return (
      <header class="header">

      {/* // <div class="logo">
          <Link to='/home'><img class="logo" src="./Img/pet-love.png" alt=""></img></Link>
       </div> */}

      <div class="name-u">
      <Link to='/user-home'> <h3 class="header-u">Fur - ever Friends</h3></Link>
      </div>

      <div class="shop-nav-u">
        <nav class="nav2-u">
         <ul class="nav2-list-u"> 
          <li>
            <a>shop</a>
            <ul class="dropdown-u">
                <li><Link to='/user-dog'>dog</Link></li>
                <li><Link to='/user-cat' >cat</Link></li>
                <li><Link to='/user-fish'>fish</Link></li>
                <li><Link to='/user-pony'>pony</Link></li>
                
            </ul>
           </li> 
          </ul>
        </nav>
      </div>

        <nav class="nav-u">
        <ul class="nav-list-u">   
          
          <li><Link to='/userfleas'>prevent fleas & ticks<img class="flea-u" src="/Img/flea.png"></img></Link></li>
          <li className='purchased-u'><Link to='/user-purchased'>purchased</Link></li>
        </ul>
        </nav>


        <div className="cart-u">
        <Link to='/user-cart' className="cart-a-u">
          <FontAwesomeIcon icon={faShoppingCart} className="bounce" />
            <div className='cart-number'>
            <p>{cartCount}</p>
            </div>
          <h4 className="text-c-u">cart</h4>
        </Link>
      </div>
 
       <div class="logout-u">
        <a class="logout-a-u" onClick={handleLogout}>
        <img class="logout-u" src="/Img/account.png"></img>
        <h4 class="text-u">log out</h4>
        </a>
       </div>
      
      
</header>

    );
}

export default UserHeader;