import {useRef, useState, useEffect} from 'react';
import { FaRegStar } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import {motion} from "framer-motion";
import  UserHeader from './user-header.js';
import  Footer from '../../Components/footer.js';
import axios from 'axios';
var Link = require('react-router-dom').Link

function UserCat(){
   const [pro,setPro]=useState([]);

   const LoadCat=async()=>{
      const response= await axios.get('http://localhost:5000/product/cat');
      console.log(response.data);
      setPro(response.data)
    }
  
    useEffect(()=>{
      LoadCat();
    },[]);


    return(
      <div>
         <div>
            <UserHeader/>
         </div>

         <div className='product-container'>
    {pro.map((product,index)=>(
         <div key={product.Product_id} className='card-back'>

         <div class="card" >
        <div class='fotoja-div'>
        <Link to='/shop'><img class='fotoja' src="./Img/cat-bag.jpg" ></img></Link>
        </div>

       <div class="caption">

        <p class="rate">
           <i class="FaRegStar"><FaStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
        </p>

         <h3 class='product_name'>Product name: {product.Name}</h3>
         <p class="price">{product.Price}$</p>
         <p class='discount'>number of discount:  {product.Price_before_discount}$</p>
         <p class='in stock'>number in stock: {product.nr_in_stock}</p>   
       </div>
       <div class='products-button'>
       <motion.button class='purchase'whileHover={{scale:1.1}} >Purchase</motion.button>
       <motion.button class='add' whileHover={{scale:1.1}}><i class="FaCartPlus"><FaCartPlus  size={'20px'}/></i></motion.button>
       </div>
       </div>
      </div> 
 ))}
  </div>
       <div>
      <Footer/>
   </div>
    </div>
    );
}

export default UserCat;
