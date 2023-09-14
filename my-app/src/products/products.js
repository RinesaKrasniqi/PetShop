import {useRef, useState, useEffect} from 'react';
import './productscss.css'
import { FaRegStar } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import {motion} from "framer-motion";
import  Header from '../Components/header.js';
import  Footer from '../Components/footer.js';
import axios from 'axios';
var Link = require('react-router-dom').Link

function Products(){
   const [pro,setPro]=useState([]);
   const [allfoto, setAllFoto] = useState([]);

   const LoadCat=async()=>{
      const response= await axios.get('http://localhost:5000/product/cat');
      console.log(response.data);
      setPro(response.data)
    }
  
    const getFoto=async()=>{
      const result=await axios.get('http://localhost:5000/get-foto');
      console.log(result);
      setAllFoto(result.data.data);
    
    }
    useEffect(()=>{
      LoadCat();
      getFoto();
    },[]);


    return(
      <div>
         <div>
            <Header/>
         </div>

         <div className='product-container'>
    {pro.map((product,index)=>(
         <div key={product.Product_id} className='card-back'>

         <div class="card" >
        <div class='fotoja-div'>
        <Link to='/shop'>
        {allfoto && allfoto.map((foto, index) => (
              <img src={`../../Images/${foto.foto}`} key={index} alt={`Product Image - ${product.Name}`} />
         ))}
         </Link>
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

export default Products;
