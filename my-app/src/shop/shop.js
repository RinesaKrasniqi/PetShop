import {useRef, useState, useEffect} from 'react';
import './shopcss.css';
import {motion} from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import  Header from '../Components/header.js';
import  Footer from '../Components/footer.js';

function Shop(){

  const handleCart=()=>{
    window.alert('You should log in!');
 }

    return(
    <div>
         <div>
            <Header/>
         </div>

<div class='shop-divider'>
  
<div class='div-fotoshop'>
        <img class='fotoja-shop' src="./Img/cat-bag.jpg"></img>
</div>


<div class='caption-shop'>
    <h3 class='product-name-shop'>Kitten hand-bag</h3>
    <p class="rate-shop">
           <i class="FaRegStar"><FaStar color="gold" fill="gold" size='20px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='20px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='20px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='20px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='20px'/></i>
    </p>
        <p class='description-shop'>Cute kitten handbags in white and black for sale now:D</p>
        <p class="price-shop">17$</p>
        <p class='discount-shop'>New Customer Only: Spend $45- GET 20% off
                                 + shipping with code: FURRR</p>
        <p class='instock-shop'>only - 5 - left</p>


    <div class='shop-pickquantity'>
      <label for="quantity">Quantity:      </label>
      <input class='quantity-input' type="number" id="quantity" name="quantity" min="1" max="5" ></input>

    </div>

     <div class='shop-buttons'>
       <motion.button class='purchase-shop 'whileHover={{scale:1.1}} >Purchase</motion.button>
       <motion.button class='add-shop'onClick={handleCart} whileHover={{scale:1.1}}><i class="FaCartPlus"><FaCartPlus  size={'20px'}/></i></motion.button>
     </div>
</div>
</div>
    <div>
      <Footer/>
   </div>

    </div>
    );
}

export default Shop;