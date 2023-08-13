import {useRef, useState, useEffect} from 'react';
import './addtocartcss.css'
import { FaRegStar } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import {motion} from "framer-motion";
import  Header from '../Components/header.js';
import  Footer from '../Components/footer.js';
var Link = require('react-router-dom').Link

function Cart(){
    return(
      <div>
         <div>
            <Header/>
         </div>

         <div class='cart-container'>
            <i className='FaCartPlus1'><FaCartPlus  color='rgb(175, 174, 174)' size='250'/></i>
            <p className='p-cart'>No items yet? Continue shopping to explore and Sign in</p>
            <Link to='/signup'><button className='button-conatiner'>SIGN UP</button></Link>
        </div>
    </div>
    );
}

export default Cart;
