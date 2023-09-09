import './user-headercss.css';
import { Link } from "react-router-dom";


function UserHeader() {
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
                <li><Link to='/pony'>pony</Link></li>
            </ul>
           </li> 
          </ul>
        </nav>
      </div>

        <nav class="nav-u">
        <ul class="nav-list-u">   
          
          <li><Link to='/fleasandticks'>prevent fleas & ticks<img class="flea-u" src="./Img/flea.png"></img></Link></li>
          <li className='purchased-u'><Link to='/user-purchased'>purchased</Link></li>
        </ul>
        </nav>


       <div class="cart-u">
       <Link to='/user-cart' class="cart-a-u">
        <img class="cart-icon-u" src="./Img/add-cart.png"></img>
        <h4 class="text-c-u">cart</h4>
        </Link>
       </div>
 
       <div class="logout-u">
        <Link to='/login' class="logout-a-u">
        <img class="logout-u" src="./Img/account.png"></img>
        <h4 class="text-u">log out</h4>
        </Link>
       </div>
      
      
</header>

    );
}

export default UserHeader;