import React, { useState, useEffect } from 'react';
import '../products/productscss.css';
import { FaCartPlus, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from '../Components/header.js';
import Footer from '../Components/footer.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FleasAndTicks() {
   const [pro, setPro] = useState([]);
   const[file, setFile]=useState();
   const [foto, setFoto] = useState("");

   const navigate= useNavigate();

   const LoadFleasAndTicks = async () => {
      try {
         const response = await axios.get('http://localhost:5000/product/fleasandticks');
         console.log(response.data);
         setPro(response.data.recordset);
      } catch (error) {
         console.error('Error fetching product data:', error.message);
      }
   }

   const handleCart = () => {
      (navigate("/login"));
    };

   const handleInsert = () => {
      const formdata = new FormData();
      formdata.append('foto', file);
      axios.post('http://localhost:3000/insert', formdata)
         .then(res => console.log(res))
         .catch(err => console.log(err));
   }

   useEffect(() => {
      axios.get('http://localhost:5000/')
         .then(res => {
            console.log('API Response:', res); 
            if (Array.isArray(res.data) && res.data.length > 0) {
               const i = 0;
               setFoto(res.data[i]);
            } else {
               console.error('No data received from the API.');
            }
         })
         .catch(err => console.error('Error fetching data:', err));
         LoadFleasAndTicks();
   }, []);

   const calculateStarRating = (nr_of_stars) => {
      return nr_of_stars;
   }

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
                    <Link to={`/products/edit/${product.Product_id}`}>
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
                    <motion.button className='purchase' whileHover={{ scale: 1.1 }} onClick={handleCart}>Purchase</motion.button>
                    <motion.button className='add' whileHover={{ scale: 1.1 }} onClick={handleCart}>
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

export default FleasAndTicks;
