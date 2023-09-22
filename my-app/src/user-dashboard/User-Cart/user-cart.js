import { Link } from "react-router-dom";
import UserHeader from '../User-Home/user-header.js';
import Footer from '../../Components/footer.js';
import './user-cartcss.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PayButton from "../../payment/PayButton.js";

function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const [foto, setFoto] = useState("");


  const LoadCart = async () => {
    const response= await axios.get('http://localhost:5000/carts');
    console.log(response.data);
    setCartItems(response.data)
  };
  
  const deleteCart = async (Cart_Id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${Cart_Id}`);
      LoadCart();
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  useEffect(() => {
    LoadCart();
  },);

  return (
    <div className="back-cart-c">
      <div>
        <UserHeader />
      </div>
  
      <div className='cart-first'>
        <img src='./Img/cart-user.png' className='cart-img-1' alt="Cart" />
        <span className='span-cart'>My Cart</span>
      </div>
      <div className='devider-cart'></div>
  
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((product, index) => (
            <div key={product.Cart_Id}>
              <div className='cart-second'>
                <div className='cart-img-2'><img src={`Img/${product.foto}`} className='cart-img-2' /></div>
                <div className='p-cart-1'>
                  <p className='p-c'>{product.Name}</p>
                  <p>{product.Description}</p>
                </div>
                <div className='p-cart-2'>
                  <p>Each</p>
                  <p className='p-c-p'>{product.Price}</p>
                </div>
                <div className='p-cart-4'>
                  <p>Total Price</p>
                  <p>{product.Price * product.nr_in_stock}</p>
                </div>
  
                <div className='p-cart-5'>
                  <button className="logout-a-u"> <PayButton cartItems={cartItems} /></button>
                </div>
  
                <div className='p-cart-6'>
                  <button className="logout-a-r" onClick={() => deleteCart(product.Cart_Id)}>Remove</button>
                </div>
              </div>
  
              <div className='devider-cart'></div>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
  
      <div>
        <Footer />
      </div>
    </div>
  );
 }  

export default UserCart;
