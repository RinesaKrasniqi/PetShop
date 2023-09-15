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

function Products() {
   const [pro, setPro] = useState([]);

   const LoadCat = async () => {
      try {
         const response = await axios.get('http://localhost:5000/product/cat');
         console.log(response.data);
         setPro(response.data);
      } catch (error) {
         console.error('Error fetching product data:', error.message);
      }
   }

   useEffect(() => {
      LoadCat();
   }, []);

   return (
      <div>
         <div>
            <Header />
         </div>

         <div className='product-container'>
            {pro.map((product) => (
               <div key={product.Product_id} className='card-back'>
                  <div className="card">
                     <div className='fotoja-div'>
                        <Link to='/shop'>
                                <img class='fotoja' src="./Img/horsefood.jpg" ></img>
                        </Link>
                     </div>

                     <div className="caption">
                        <p className="rate">
                           <FaStar color="gold" fill="gold" size='18px' />
                           <FaStar color="gold" fill="gold" size='18px' />
                           <FaStar color="gold" fill="gold" size='18px' />
                           <FaStar color="gold" fill="gold" size='18px' />
                           <FaStar color="gold" fill="gold" size='18px' />
                        </p>
                        <h3 className='product_name'>Product name: {product.Name}</h3>
                        <p className="price">{product.Price}$</p>
                        <p className='discount'>number of discount:  {product.Price_before_discount}$</p>
                        <p className='in stock'>number in stock: {product.nr_in_stock}</p>
                     </div>
                     <div className='products-button'>
                        <motion.button className='purchase' whileHover={{ scale: 1.1 }}>Purchase</motion.button>
                        <motion.button className='add' whileHover={{ scale: 1.1 }}>
                           <i className="FaCartPlus"><FaCartPlus size={'20px'} /></i>
                        </motion.button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         <div>
            <Footer />
         </div>
      </div>
   );
}

export default Products;