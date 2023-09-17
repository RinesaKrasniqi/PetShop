import { Link } from "react-router-dom";
import  UserHeader from '../User-Home/user-header.js';
import  Footer from '../../Components/footer.js';
import './user-cartcss.css';
import {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import PayButton from "../../payment/PayButton.js";

function UserCart () {
  const [cartItems, setCartItems] = useState([]);
  const[file, setFile]=useState();
   const [foto, setFoto] = useState({ image: '' });

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
          <div className='cart-img-2'><img  src={`Img/${product.foto}`} className='cart-img-2'></img></div>
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
            <button class="logout-a-u"> <PayButton cartItems={product.cartItems}/></button>
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