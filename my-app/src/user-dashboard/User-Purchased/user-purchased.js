import { Link } from "react-router-dom";
import UserHeader from '../User-Home/user-header.js';
import Footer from '../../Components/footer.js';
import './user-purchasedcss.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const Client_id = Cookies.get('Client_id');


function UserPurchased() {
  const [purchasedItems, setPurchasedItems] = useState([]);

  const loadPurchasedItems = async () => {
    try {
      const Client_id = Cookies.get('Client_id');
      const response = await axios.get(`http://localhost:5000/status1/${Client_id}`, {
        withCredentials: true,
      });
      if (Array.isArray(response.data)) {
        setPurchasedItems(response.data);
      } else {
        console.error('Data received is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error loading purchased items:', error);
    }
  };
  
  useEffect(() => {
    loadPurchasedItems();
  }, []);

  return (
    <div>
      <UserHeader />
      <div className='cart-first'> 
        <img src='./Img/cart-user.png' className='cart-img-1' alt="Cart" />
        <span className='span-cart'>My Purchases</span>
      </div>
      <div className='devider-cart'></div>
      {purchasedItems.length > 0 ? (   
        purchasedItems.map((item, index) => (
          <div key={item.id}>
            {index !== 0 && <div className='devider-cart'></div>} {/* Divider except for the first item */}
            <div className='purchase-second'>
              <div className='purchase-img-2'><img src={`Img/${item.foto}`} className='purchase-img-2' alt={item.Name} /></div>
              <div className='p-pur-1'>
                <p className='p-cc'>{item.Name}</p>
                <p>{item.Description}</p>
              </div>
              <div className='p-pur-2'>
                <p>Each</p> 
                <p className='p-p'>{item.Price}</p>
              </div>
              <div className='p-pur-3'>
                <p>Quantity</p>
                <p className='p-q'>{item.quantity}</p>
              </div>
              <div className='p-pur-4'>
                <p>Total Price</p>
                <p>{item.Price * item.quantity}$</p>
              </div>
              <div className='p-pur-5'>
                <div className="pur-c"></div>
                <Link to='#' className="logout-p">Delivered</Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div> 
        <img src="./Img/pet-food-cart.png" className="img-pet-purchase"></img>
        <h3 className="no-pushase">You haven't made any purchases yet. </h3>
        <p className="no-purchase-p">Seems like your purchase history is as blank as a fresh canvas.</p>
        <p className="no-purchase-pp"> Let's jazz it up with something special, shall we?</p>
      </div> 
      )}

      <div className='devider-cart'></div>
      <Footer />
    </div>
  );
}

export default UserPurchased;
