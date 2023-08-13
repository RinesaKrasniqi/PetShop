import { Link } from "react-router-dom";
import  UserHeader from '../User-Home/user-header.js';
import  Footer from '../../Components/footer.js';
import './user-cartcss.css';
import {useRef, useState, useEffect} from 'react';
import axios from 'axios';

function UserCart () {


  const [cartItems, setCartItems] = useState([]);

  const LoadCart=async()=>{
    axios.get('http://localhost:5000/cart')
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  const deleteCart = async (Cart_Id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${Cart_Id}`);
      LoadCart();
    } catch (error) {
      console.log('Error deleting user:', error);
    }
};

useEffect(() => {
  LoadCart();
}, []);


    return(
      <div className="back-cart-c">
        <div>
          <UserHeader/>
        </div>

       
        <div className='cart-first'> 
          <img src='./Img/cart-user.png' className='cart-img-1'></img>
          <span className='span-cart'>My Cart</span>
        </div>
        <div className='devider-cart'></div>

        <div>
    {cartItems.map((product,index)=>(
         <div key={product.Cart_Id}>
        <div className='cart-second'>
          <div className='cart-img-2'><img src='./Img/card3.jpg' className='cart-img-2'></img></div>
          <div className='p-cart-1'>
            <p className='p-c'>{product.Name}</p>
            <p>{product.Description}</p>
          </div>
          <div className='p-cart-2'>
            <p>Each</p> 
            <p className='p-c-p'>{product.Price}</p>
          </div>
          <div className='p-cart-3'>
            <p>Quantity</p>
            <p className='p-c-q'>{product.nr_in_stock}</p>
          </div>
          <div className='p-cart-4'>
            <p>Price</p>
            <p>{product.Price}</p>
          </div>
        
          <div className='p-cart-5'>
          <Link to='#' class="logout-a-u">Purchase</Link>
          </div>

          <div className='p-cart-6'>
          <button class="logout-a-r" onClick={() => deleteCart(product.Cart_Id)}>Remove</button>
          </div>
        </div>

        <div className='devider-cart'></div>
         
        </div>
  ))}
  </div>

      <div>
       <Footer/>
      </div>

      </div>
    );
}


export default UserCart;