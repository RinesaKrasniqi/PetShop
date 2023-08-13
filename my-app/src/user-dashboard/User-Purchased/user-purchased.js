import { Link } from "react-router-dom";
import  UserHeader from '../User-Home/user-header.js';
import  Footer from '../../Components/footer.js';
import './user-purchasedcss.css';

function UserPurchased(){
   return(
      <div>
        <div>
            <UserHeader/>
        </div>
        <div className='cart-first'> 
          <img src='./Img/cart-user.png' className='cart-img-1'></img>
          <span className='span-cart'>My Purchases</span>
        </div>
        <div className='devider-cart'></div>

        <div className='purchase-second'>
          <div className='purchase-img-2'><img src='./Img/card5.jpg' className='purchase-img-2'></img></div>
          <div className='p-pur-1'>
            <p className='p-cc'>The Dog Fans Jacket/Raincoat</p>
            <p>Dog jacket that your dog can wear on windy or rainy days</p>
          </div>
          <div className='p-pur-2'>
            <p>Each</p> 
            <p className='p-p'>$55.99</p>
          </div>
          <div className='p-pur-3'>
            <p>Quantity</p>
            <p className='p-q'>1</p>
          </div>
          <div className='p-pur-4'>
            <p>Price</p>
            <p>$55.99</p>
          </div>
        
          <div className='p-pur-5'>
            <div className="pur-c"></div>
           <Link to='#' class="logout-p">Delivered</Link>
          </div>
        </div>

  

        <div className='devider-cart'></div>
         
        <div className='purchase-second'>
          <div className='purchase-img-2'><img src='./Img/card6.jpg' className='purchase-img-2'></img></div>
          <div className='p-pur-1'>
            <p className='p-cc'>Apple Squeaking Cat Toy</p>
            <p>Squeaking apple cat toy</p>
          </div>
          <div className='p-pur-2'>
            <p>Each</p> 
            <p className='p-p'>$11.99</p>
          </div>
          <div className='p-pur-3'>
            <p>Quantity</p>
            <p className='p-q'>1</p>
          </div>
          <div className='p-pur-4'>
            <p>Price</p>
            <p>$11.99</p>
          </div>
        
          <div className='p-pur-6'>
            <div className="pur-c-6"></div>
           <Link to='#' class="logout-p6">On The Way</Link>
          </div>
        </div>


        <div className='devider-cart'></div>
      

      <div>
       <Footer/>
      </div>
      </div>
   );
}


export default UserPurchased;