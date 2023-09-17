import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegStar } from 'react-icons/fa';
import { FaPaw } from 'react-icons/fa';
import { FaOpencart } from 'react-icons/fa';
import { FaCartPlus } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import UserHeader from './user-header.js';
import Footer from '../../Components/footer.js';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


// const setUserIdCookie = (userId) => {
//   Cookies.set('userId', userId, { expires: 7 });
// };

function UserDog() {
  const [pro, setPro] = useState([]);
  const [Product_id, setProduct_id] = useState('');
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState('');
  const [nr_in_stock, setInStock] = useState('');
  const [nr_of_stars, setStars] = useState('');
  const [Price_before_discount, setDiscount] = useState('');
  const [Category, setCategory] = useState('');
  const [Client_id, setClient_id] = useState('');

  const LoadDog = async () => {
    const response = await axios.get('http://localhost:5000/product/dog');
    console.log(response.data);
    setPro(response.data);
  };
  

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
            Client_id: parseInt(userId)
          };
  
          try {
            await axios.post('http://localhost:5000/cart', data);
            window.alert('Product added to cart successfully!');
          } catch (error) {
            console.error('Error adding product to cart:', error);
          }
        } else {
          console.log('User is not authenticated');
          window.alert('Please log in to add products to your cart.');
        }
      } catch (error) {
        console.error('Error getting user ID from cookie:', error);
      }
    }
  };
  

  useEffect(() => {
    LoadDog();
  }, []);

  return (
    <div>
      <div>
        <UserHeader />
      </div>
      <div className="product-container">
        {pro.map((product, index) => (
          <div key={product.Product_id} className="card-back">
            <div className="card">
              <div className="fotoja-div">
                <Link to="/shop">
                  <img className="fotoja" src="./Img/download.jpg" alt="Product" />
                </Link>
              </div>

              <div className="caption">
                <p className="rate">
                  <i className="FaRegStar">
                    <FaStar color="gold" fill="gold" size="18px" />
                  </i>
                  {/* ... (other code) */}
                </p>
              </div>
              <div className="products-button">
                <motion.button className="purchase" whileHover={{ scale: 1.1 }}>
                  Purchase
                </motion.button>
                <motion.button className="add" whileHover={{ scale: 1.1 }} onClick={() => handleAddToCart(product.Product_id)}>
                  <i className="FaCartPlus">
                    <FaCartPlus size={'20px'} />
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

export default UserDog;
