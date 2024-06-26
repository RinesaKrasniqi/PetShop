import {useRef, useState, useEffect} from 'react';
import './admin-dashboardcss.css'
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
import axios from 'axios';
var Link = require('react-router-dom').Link

function AdminDeliveries(){
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
             <p class="FaHome">Dashboard</p>
           </div>
  
  
            <div class='elements'>
              <div className='elements-1'>
              <FaUserAlt color="white" size='22px'/>
              <Link to='/admin-dashboard' className='link'>Users</Link>
              </div>
              <div className='elements-1'>
              <FaShoppingBasket color="white" size='22px'/>
              <Link to='/admin-products' className='link'>Products</Link>
              </div>
              <div className='elements-1'>
              <FaMoneyBill color="white" size='22px'/>
              <Link to='/admin-purchases' className='link'>Purchases</Link>
              </div>
              <div className='elements-1'>
              <FaTelegramPlane color="white" size='22px'/>
              <Link to='/admin-deliveries' className='link'>Deliveries</Link>
              </div>
              <div className='elements-2'>
              <img className='amdin-logout' src='./Img/logout-admin.png'></img>
              <Link to='/home'><button class='a-d-logout'>Log out</button></Link>
              </div>
  
            </div>
          </div>
  
          <div className='both-back'>
           <div className='user-div-nr'>
              <div className='acc-dash'> <FaTelegramPlane color="white" size="35px" style={{ marginLeft: '6px', marginTop: '5px' }}/></div>
              <p className='acc-dash-p'>Deliveries:</p>
              <p className='acc-dash-pp'>{postmanDelivered.length}</p>
           </div>
  
          
          <div className='second-div-a'>
            <h2 class="user-h2">Deliveries list:</h2>
            <div class="user">
              <table  class="user-table">
                <thead class="user-head" >
                    <tr className='user-tr'>
                      <td className='user-td'>Client ID</td>
                      <td className='user-td'>Product ID</td>
                      <td className='user-td'>Delivery ID</td>
                      <td className='user-td'>Delivery status</td>
                      <td className='user-td'>Product name</td>
                      {/* <td className='user-td'>Update</td>
                      <td className='user-td'>Delete</td> */}
                    </tr>
                </thead>
                <tbody class='bottom-table-post'>
                   {postmanDelivered.map((purchase) => (
                     <tr key={purchase.Product_id} className='bottom-tr-post'>
                      <td className='bottom-td-post'>{purchase.Client_id}</td>
                     <td className='bottom-td-post'>{purchase.Product_id}</td>
                     <td className='bottom-td-post'>{purchase.Cart_Id}</td>
                     <td className='bottom-td-post'>{purchase.delivery}</td>
                     <td className='bottom-td-post'>{purchase.Name}</td>
                     
                     </tr>
                    ))}
                  </tbody>
               </table>
               </div>
              </div>
              </div>
              
      </div>
           
      );
}

export default AdminDeliveries;