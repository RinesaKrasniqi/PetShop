import './headercss.css';
import { Link } from "react-router-dom";
import Home from "../home/home.js";
import Register from "../register/register.js";

function LoginHeader() {
    return (
      <header class="header">

      {/* // <div class="logo">
          <Link to='/home'><img class="logo" src="./Img/pet-love.png" alt=""></img></Link>
       </div> */}

      <div class="name">
      <Link to='/home'> <h3 class="header-n">Fur - ever Friends</h3></Link>
      </div>

      <div class="shop-nav">
        <nav class="nav2">
         <ul class="nav2-list"> 
          <li>
            <a>shop</a>
            <ul class="dropdown">
                <li><Link to='/dog'>dog</Link></li>
                <li><Link to='/cat' >cat</Link></li>
                <li><Link to='/fish'>fish</Link></li>
                <li><Link to='/pony'>pony</Link></li>
            </ul>
           </li> 
          </ul>
        </nav>
      </div>

        <nav class="nav">
        <ul class="nav-list">   
          
          <li><Link to='/fleasandticks'>prevent fleas & ticks<img class="flea" src="/Img/flea.png"></img></Link></li>
      </ul>
      </nav>

     

      <div class="account">
        <Link to='/signup' href="#" class="acc-a">
        <img class="acc-icon" src="/Img/account.png"></img>
        <h4 class="text-s">sign up</h4>
        </Link>
       </div>


      
       <div class="cart">
       <Link to='/addtocart' class="cart-a">
        <img class="cart-icon" src="/Img/add-cart.png"></img>
        <h4 class="text-c">cart</h4>
        </Link>
       </div>
</header>

    );
}

export default LoginHeader;