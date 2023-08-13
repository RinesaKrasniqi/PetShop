import {useRef, useState, useEffect} from 'react';
import axios from 'axios';
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

function Dog(){
   const [pro,setPro]=useState([]);
   
   const LoadDog=async()=>{
      const response= await axios.get('http://localhost:5000/product/dog');
      console.log(response.data);
      setPro(response.data)
    }
  
    useEffect(()=>{
      LoadDog();
    },[]);


    return(
      <div>
         <div>
            <Header/>
         </div>
         <div className='product-container'>
    {pro.map((product,index)=>(
         <div key={product.Product_id} className='card-back'>

         <Link to='/shop'><div className="card">
        <div class='fotoja-div'>
        <img class='fotoja' src="./Img/download.jpg" ></img>
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
       </div></Link>
       
      </div>
  ))}
  </div>
       <div>
      <Footer/>
   </div>
    </div>
    );
}

export default Dog;
