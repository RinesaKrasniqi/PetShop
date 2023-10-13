import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './shopcss.css';
import { FaCartPlus, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Header from '../Components/header.js';
import Footer from '../Components/footer.js';


function Shop() {
  const { Product_id } = useParams();
  const [pro, setPro] = useState([]);
  
const navigate= useNavigate();

  useEffect(() => {
    const getProductId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/edit/${Product_id}`);
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

  const handleCart = () => {
    (navigate("/login"));
  };

  const handlePurchase = () => {
    (navigate("/login"));
  };

  return (
    <div>
      <div>
        <Header />
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
            <motion.button className="purchase-shop" onClick={handlePurchase} whileHover={{ scale: 1.1 }}>
              Purchase
            </motion.button>
            <motion.button className="add-shop" onClick={handleCart} whileHover={{ scale: 1.1 }}>
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

export default Shop;
