import {useRef, useState, useEffect} from 'react';
import '../products/productscss.css'
import { FaRegStar } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import {motion} from "framer-motion";
import  Header from '../Components/header.js';
import  Footer from '../Components/footer.js';
var Link = require('react-router-dom').Link

function Fleas(){
    return(
      <div>
         <div>
            <Header/>
         </div>
         <Link to='/shop'><motion.div class="card" whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
        <div class='fotoja-div'>
        <img class='fotoja' src="./Img/fleasshampoo.jpg" ></img>
        </div>

       <div class="caption">

        <p class="rate">
           <i class="FaRegStar"><FaStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
        </p>

        <h3 class='product_name'>Product name</h3>
        <p class="price">price</p>
        <p class='discount'>number of discount:</p>
        <p class='in stock'>number in stock</p>
       </div>
       <div class='products-button'>
       <motion.button class='purchase'whileHover={{scale:1.1}} >Purchase</motion.button>
       <motion.button class='add' whileHover={{scale:1.1}}><i class="FaCartPlus"><FaCartPlus  size={'20px'}/></i></motion.button>
       </div>
       </motion.div></Link>
       

       <div>
      <Footer/>
   </div>
    </div>
    );
}

export default Fleas;
