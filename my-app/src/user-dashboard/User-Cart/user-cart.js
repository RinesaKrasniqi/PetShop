import { Link } from "react-router-dom";
import UserHeader from '../User-Home/user-header.js';
import Footer from '../../Components/footer.js';
import './user-cartcss.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
<<<<<<< HEAD
import PayButton from "../../payment/PayButton.js";
import EditCart from "./editcart.js";
import {FaPlus, FaMinus } from 'react-icons/fa';
=======
import PayButton from "../User-Home/PayButton.js";
>>>>>>> b72fd0d9205e6b911c7a7b7d37239e29547b4f9c

function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const [foto, setFoto] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [userName, setUserName] = useState('');
  const [buttonPopup, setButtonPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);


  
const updateCartItemQuantity = async (Cart_Id, updatedQuantity) => {
  try {
    await axios.put(`http://localhost:5000/cart/update/${Cart_Id}`, { quantity: updatedQuantity });
    // Refresh the cart items after the update
    LoadCart();
  } catch (error) {
    console.error('Error updating quantity:', error);
    // Handle errors appropriately
  }
};

  const Client_id = Cookies.get('Client_id');

  const incrementQuantity = () => {
    setQuantity(Math.min(quantity + 1, 5));
  };

  const decrementQuantity = () => {
    setQuantity(Math.max(quantity - 1, 1));
  };


  const handleQuantityChange = (e) => {

    let newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > 5) {
      newQuantity = 5;
    }
    setQuantity(newQuantity);
  };
   
  
  useEffect(() => {
    try {
      const Client_id = Cookies.get('Client_id');
      console.log('client_id', Client_id);
      axios.get(`http://localhost:5000/totalprice/${Client_id}`)
        .then((response) => {
          if (response.data.price && response.data.price[0].TotalPrice) {
            const price = response.data.price[0].TotalPrice;
            setTotalPrice(price);
          } else {
            console.error('API response does not have the expected structure.');
          }
        })
        .catch((error) => {
          console.error('API request failed:', error);
        });
    } catch (error) {
      console.error(error);
    }
  },[]);
  


  const LoadCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/carts', {
        withCredentials: true,
      });
      // console.log(response.data);
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const LoadUserN = async () => {
    try {
      const response = await axios.get('http://localhost:5000/userName', {
        withCredentials: true,
      });
      setUserName(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  
  const deleteCart = async (Cart_Id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${Cart_Id}`);
      window.location.reload();
      LoadCart();
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  useEffect(() => {
    LoadCart();
  },[]);

  useEffect(() => {
    LoadUserN();
  },[]);

  return (
    <div className="back-cart-c">
      <UserHeader />
      <div className='cart-first'>
        <img src='./Img/cart-user.png' className='cart-img-1' alt="Cart" />
        <span className='span-cart'>My Cart</span>
      </div>
      {userName.length > 0 ? (
        <div>
          <p className="p-username">Welcome to your cart, {userName[0].name}!</p>
          <p className="p-username2">Explore our amazing products and enjoy your shopping experience.</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className='devider-cart'></div>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((product) => (
            <div key={product.Cart_Id}>
              <div className='cart-second'>
                <div className='cart-img-2'><img src={`Img/${product.foto}`} className='cart-img-2' /></div>
                <div className='p-cart-1'>
                  <p className='p-c'>{product.Name}</p>
                  <p>{product.Description}</p>
                </div>
                <div className='p-cart-2'>
                  <p>In stock</p>
                  <p className='p-c-p'>{product.nr_in_stock}</p>
                </div>
                <div className='p-cart-2'>
                  <p>Quantity selected</p>
                  <p className='p-c-p'>{product.quantity}</p>
                </div>
                <div className='p-cart-4'>
                  <p>Total price</p>
                  <p>{product.Price*product.quantity}$</p>
                </div>
                <div className='p-cart-5'>
                  <button className="logout-a-u"> <PayButton cartItems={cartItems} /></button>
                </div>
                <div className='p-cart-6'>
                  <button className="logout-a-r" onClick={() => deleteCart(product.Cart_Id)}>Remove</button>
                </div>
              </div>
              <div className='p-cart-8'>
                <button className="edit-a-t" onClick={() => setButtonPopup(true)}> Edit</button>
              </div>
              <div className='devider-cart-2'></div>
            </div>
          ))
        ) : (
          <div> 
            <img src="./Img/pet-food-cart.png" className="img-pet-cart"></img>
            <h3 className="no-product">Your Shopping Cart is Empty</h3>
            <p className="no-product-p">It feels so good shopping for your pet. Indulge your pet and buy what he needs.</p>
          </div> 
        )}
      </div>
      <div className="checkout-d">
<<<<<<< HEAD
        <div className="total-p">
          <p className="total-p">Total: </p>
          <p className="t-price">EUR$ {totalPrice}.00</p>
        </div>
        <button className="checkout-btn">Checkout</button>
=======
                  <div className="total-p">
                  <p className="total-p">Total: </p>
                  <p className="t-price">EUR$ {totalPrice}.00</p>
                  </div>
                  <button className="checkout-btn"><PayButton cartItems={cartItems}/></button>
                </div>
      <div>
        <Footer />
>>>>>>> b72fd0d9205e6b911c7a7b7d37239e29547b4f9c
      </div>
      <EditCart trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2 className='h2-post'>Edit quantity</h2>
        <div className="shop-pickquantity">
          <p className="quantity1">Quantity: </p>
          <div className="quantity-control1">
            <button className="quantity-button1" onClick={decrementQuantity}>
              <FaMinus />
            </button>
            <input
              className="quantity-input1"
              type="number"
              id="quantity1"
              name="quantity1"
              min="1"
              max="5"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button className="quantity-button" onClick={incrementQuantity}>
              <FaPlus />
            </button>
          </div>
        </div>
        {cartItems.map((product) => (
          <div key={product.Cart_Id}>
            <Link to={`/cart/update/${product.Cart_Id}`}>
            <button className='save' onClick={() => updateCartItemQuantity(product.Cart_Id, quantity)}>Save</button>
            </Link>
          </div>
        ))}
      </EditCart>
      <Footer />
    </div>
  );
}

export default UserCart;