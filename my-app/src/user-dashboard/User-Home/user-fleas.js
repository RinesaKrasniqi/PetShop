import React, { useState, useEffect } from 'react';
import '../../products/productscss.css';
import { FaRegStar } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import {motion} from "framer-motion";
import  UserHeader from './user-header.js';
import  Footer from '../../Components/footer.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import PayButton from "../../payment/PayButton.js";
var Link = require('react-router-dom').Link

function UserFleas() {
   const [pro, setPro] = useState([]);
   const[file, setFile]=useState();
   const [foto, setFoto] = useState("");
   const [Product_id, setProduct_id] = useState("");
   const [Name, setName] = useState("");
   const [Description, setDescription] = useState("");
   const [Price, setPrice] = useState("");
   const [nr_in_stock, setInStock] = useState("");
   const [nr_of_stars, setStars] = useState("");
   const [Price_before_discount, setDiscount] = useState("");
   const [Category, setCategory] = useState("");

   const LoadFleasAndTicks = async () => {
      try {
         const response = await axios.get('http://localhost:5000/product/fleasandticks');
         console.log(response.data);
         setPro(response.data);
      } catch (error) {
         console.error('Error fetching product data:', error.message);
      }
   }

   const handleAddToCart = async (productId) => {
      const selectedProduct = pro.find((product) => product.Product_id === productId);
    
      if (selectedProduct) {
        try {
          const userId = Cookies.get('Client_id');
          console.log('User ID from cookie:', userId);
    
          if (userId) {
            console.log('User is authenticated with ID:', userId);
    
            const data = {
              Product_id: selectedProduct.Product_id,
              Name: selectedProduct.Name,
              Description: selectedProduct.Description,
              Price: selectedProduct.Price,
              nr_in_stock: selectedProduct.nr_in_stock,
              nr_of_stars: selectedProduct.nr_of_stars,
              Price_before_discount: selectedProduct.Price_before_discount,
              Category: selectedProduct.Category,
              foto:selectedProduct.foto,
              Client_id: parseInt(userId),
            };
    
            try {
              await axios.post('http://localhost:5000/cart', data);
              window.alert('Product added to cart successfully!');
            } catch (error) {
              console.error('Error adding product to cart:', error);
              window.alert('Error adding product to cart');
            }
          } else {
            console.log('User is not authenticated');
            window.alert('Please log in to add products to your cart.');
          }
        } catch (error) {
          console.error('Error getting user ID from cookie:', error);
          window.alert('Error getting user ID from cookie');
        }
      }
    };


   // const handleInsert = () => {
   //    const formdata = new FormData();
   //    formdata.append('foto', file);
   //    axios.post('http://localhost:3000/insert', formdata)
   //       .then(res => console.log(res))
   //       .catch(err => console.log(err));
   // }

   useEffect(() => {
     LoadFleasAndTicks();
   }, []);

   const calculateStarRating = (nr_of_stars) => {
      return nr_of_stars;
   }

   return (
      <div>
         <div>
            <UserHeader />
         </div>

         <div className='product-container'>
            {pro.map((product) => (
               <div key={product.Product_id} className='card-back'>
                  <div className="card">
                     <div className='fotoja-div'>
                        <Link to='/shop'>
                           <img
                              className='fotoja'
                              src={`Img/${product.foto}`}
                              alt={product.Name}
                           />
                        </Link>
                     </div>

                     <div className="caption">
                        <p className="rate">
                           {Array.from({ length: calculateStarRating(product.nr_of_stars) }).map((_, index) => (
                              <FaStar key={index} color="gold" fill="gold" size='18px' />
                           ))}
                        </p>
                        <h3 className='product_name'>{product.Name}</h3>
                        <p classname='description'>{product.Description}</p>
                        <p className="price">{product.Price}$</p>
                        <p className='discount'>Price before discount: {product.Price_before_discount}$</p>
                        <p className='in stock'>number in stock: {product.nr_in_stock}</p>
                     </div>
                     <div className='products-button'>
                        <motion.button className='purchase' whileHover={{ scale: 1.1 }}>Purchase</motion.button>
                        <motion.button className='add'  onClick={() => handleAddToCart(product.Product_id)} whileHover={{ scale: 1.1 }}><i className="FaCartPlus"><FaCartPlus size={'20px'} /></i></motion.button>
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

export default UserFleas;