import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCartPlus, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import UserHeader from './user-header.js';
import  Footer from '../../Components/footer.js';
import './usershop.css';
import Cookies from 'js-cookie'



function UserShop() {
  const { Product_id } = useParams();
  const [pro, setPro] = useState([]);
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

  useEffect(() => {
    const getProductId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/shop/${Product_id}`);
        const product = response.data;
        setPro(product);
      } catch (error) {
        console.error(error);
      }
    };

    getProductId();
  }, [Product_id]);


  const calculateStarRating = (nr_of_stars) => {
    return nr_of_stars;
  };

  return (
    <div>
      <div>
        <UserHeader />
      </div>

<div>
    {pro.map((product) => (
      <div className="shop-divider">
        <div className="div-fotoshop">
          <img className="fotoja-shop" src={`/Img/${product.foto}`}
          />
        </div>

        <div className="caption-shop">
          <h3 className="product-name-shop">{product.Name}</h3>
          <p className="rate-shop">
            {Array.from({ length: calculateStarRating(product.nr_of_stars) }).map((_, index) => (
              <FaStar key={index} color="gold" fill="gold" size="18px" />
            ))}
          </p>
          <p className="description-shop">{product.Description}</p>
          <p className="price-shop">{product.Price}$</p>
          <p className="discount-shop">
            New Customer Only: Spend $45- GET 20% off + shipping with code: FURRR
          </p>
          <p className="instock-shop">only - {product.nr_in_stock} - in stock</p>

          <div className="shop-pickquantity">
            <label htmlFor="quantity">Quantity: </label>
            <input
              className="quantity-input"
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="5"
            />
          </div>

          <div className="shop-buttons">
            <motion.button className="purchase-shop" whileHover={{ scale: 1.1 }}>
              Purchase
            </motion.button>
            <motion.button className="add-shop" onClick={() => handleAddToCart(product.Product_id)} whileHover={{ scale: 1.1 }}>
              <i className="FaCartPlus">
                <FaCartPlus size="20px" />
              </i>
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

export default UserShop;
