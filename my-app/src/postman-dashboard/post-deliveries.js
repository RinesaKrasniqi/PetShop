import {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import './postman-dashboardcss.css'
import { FaRegStar } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaKey} from "react-icons/fa";
import { FaUserAlt} from "react-icons/fa"; 
import { FaMoneyBill} from "react-icons/fa"; 
import { FaShoppingBasket} from "react-icons/fa";
import { FaTelegramPlane} from "react-icons/fa";
import { FaHome} from "react-icons/fa";
import {motion} from "framer-motion";
import  Header from '../Components/header.js';
import  Footer from '../Components/footer.js';
var Link = require('react-router-dom').Link

function PostDeliveries(){
  const [postmanDelivered, setPostmanDelivered] = useState([]);

  const loadDelivered= async () => {
    try {
      const response = await axios.get('http://localhost:5000/postmanDelivered');
      setPostmanDelivered(response.data);
    } catch (error) {
      console.log('Error loading users:', error);
    }
  };

  useEffect(() => {
    loadDelivered();
  }, []);

    return(
        <div class='back-dash'>
          
          <div className='first-div-a'>
           <div className='Admin-Dash-Title'>
             <p class="FaHome-post">Dashboard</p>
           </div>
  
  
            <div class='elements-post'>
              <div className='elements-1-post'>
              <FaMoneyBill color="white" size="22px" />
              <Link to='/post-purchases' className='link'>Purchases Made</Link>
              </div>
              <div className='elements-1-post'>
              <FaTelegramPlane color="white" size='22px'/>
              <Link to='/post-deliveries' className='link'>Deliveries Sent</Link>
              </div>
              <div className='elements-2-post'>
              <img className='amdin-logout' src='./Img/logout-admin.png'></img>
              <Link to='/home'><button class='a-d-logout'>Log out</button></Link>
              </div>
  
            </div>
          </div>
  
 
          
  
         <div className='second-div-a'>
            <h2 class="post-h2">Deliveries list:</h2>
            <div class="post">
              <table  class="post-table">
                <thead class="post-head" >
                    <tr className='post-tr'>
                      <td className='post-td'>Shiping ID</td>
                      <td className='post-td'>Client Id</td>
                      <td className='post-td'>Product Name</td>
                      <td className='post-td'>Delivery Status</td>

                    </tr>
                </thead>
                <tbody class='bottom-table-post'>
                   {postmanDelivered.map((purchase) => (
                     <tr key={purchase.Product_id} className='bottom-tr-post'>
                     <td className='bottom-td-post'>{purchase.Product_id}</td>
                     <td className='bottom-td-post'>{purchase.Client_id}</td>
                     <td className='bottom-td-post'>{purchase.Name}</td>
                     <td className='bottom-td-post'>{purchase.delivery}</td>
                     </tr>
                    ))}
                  </tbody>
               </table>
               </div>
              </div>
      </div>
           
      );
}

export default PostDeliveries;
