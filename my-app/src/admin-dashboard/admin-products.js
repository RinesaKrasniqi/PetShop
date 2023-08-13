import {useRef, useState, useEffect} from 'react';
import './admin-dashboardcss.css'
import axios from 'axios';
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

function AdminProducts(){
  const [pro,setPro]=useState([]);

  const LoadProduct=async()=>{
    const response= await axios.get('http://localhost:5000/product');
    console.log(response.data);
    setPro(response.data)
  }

  useEffect(()=>{
    LoadProduct();
  },[]);


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
              <div className='elements-3'>
              <img className='add-product-img' src='./Img/add-product.png'></img>
              <Link to='/add'><button class='add-product'>Add product</button></Link>
              </div>
              <div className='elements-2'>
              <img className='amdin-logout' src='./Img/logout-admin.png'></img>
              <Link to='/home'><button class='a-d-logout'>Log out</button></Link>
              </div>
             
  
            </div>
          </div>
  
          <div className='both-back'>
           <div className='user-div-nr'>
              <div className='acc-dash'><img className='acc-dash-pic' src='./Img/acc-dash.png'></img></div>
              <p className='acc-dash-p'>Products:</p>
              <p className='acc-dash-pp'>1,000</p>
           </div>
  
          
          <div className='second-div-a'>
            <h2 class="user-h2">Product list:</h2>
            <div class="user">
              <table  class="user-table">
                <thead class="user-head" >
                    <tr className='user-tr'>
                      <td className='user-td'>Id</td>
                      <td className='user-td'>Description</td>
                      <td className='user-td'>Name</td>
                      <td className='user-td'>Price</td>
                      <td className='user-td'>In Stock</td>
                      <td className='user-td'>Stars</td>
                      <td className='user-td'>Category</td>
                      <td className='user-td'>Update</td>
                      <td className='user-td'>Delete</td>
                      
                      
                    </tr>
                </thead>
                <tbody class='bottom-table'>
                {pro.map((product,index)=>(
                  <tr class='bottom-tr' key={product.Product_id}>
                        <td class='bottom-td'>{product.Product_id}</td>
                        <td class='bottom-td'>{product.Description}</td>
                        <td class='bottom-td'>{product.Name}</td>
                        <td class='bottom-td'>{product.Price}</td>
                        <td class='bottom-td'>{product.nr_in_stock}</td>
                        <td class='bottom-td'>{product.nr_of_stars}</td>
                        <td class='bottom-td'>{product.Category}</td>
                        
                        {/* <Link to={`/updateProduct/${product.Product_id}`}><button class='upd-btn'>Update</button></Link>
                        <button class='dltt-btn' onClick={() => deleteProduct(product.Product_id)}>Delete</button>
                     */}
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

export default AdminProducts;
