import {useRef, useState, useEffect} from 'react';
import axios from 'axios';
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
var Link = require('react-router-dom').Link;


function AdminDash(){
  const [userat,setUser]=useState([]);
  const [ClientCount, setClientCount] = useState(0);

  const LoadUser=async()=>{
    const response= await axios.get('http://localhost:5000/user');
    console.log(response.data);
    setUser(response.data)
  }

  const deleteUser = async (Client_id) => {
      try {
        await axios.delete(`http://localhost:5000/user/${Client_id}`);
        LoadUser();
      } catch (error) {
        console.log('Error deleting user:', error);
      }
  };

  useEffect(()=>{
    LoadUser();
  },[]);

  useEffect(() => {
    setClientCount(userat.length);
  }, [userat]);


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
            <div className='acc-dash'><img className='acc-dash-pic' src='./Img/acc-dash.png'></img></div>
            <p className='acc-dash-p'>All Users:</p>
            <p className='acc-dash-pp'>{ClientCount}</p>
         </div>

        
        <div className='second-div-a'>
          <h2 class="user-h2">User list:</h2>
          <div class="user">
            <table  class="user-table">
              <thead class="user-head" >
                  <tr className='user-tr'>
                    <td className='user-td'>ID</td>
                    <td className='user-td'>First Name</td>
                    <td className='user-td'>Last Name</td>
                    <td className='user-td'>Email</td>
                    <td className='user-td'>Phone</td>
                    <td className='user-td'>Update</td>
                    <td className='user-td'>Delete</td>
                  </tr>
              </thead>
              <tbody class='bottom-table'>
                {userat.map((useri,index)=>(
                  <tr class='bottom-tr' key={useri.Client_id}>
                        <td class='bottom-td'>{useri.Client_id}</td>
                        <td class='bottom-td'>{useri.name}</td>
                        <td class='bottom-td'>{useri.surname}</td>
                        <td class='bottom-td'>{useri.email}</td>
                        <td class='bottom-td'>{useri.phone}</td>
                        
                        <Link to={`/updateUser/${useri.Client_id}`}><button class='upd-btn'>Update</button></Link>
                        <button class='dlt-btn' onClick={() => deleteUser(useri.Client_id)}>Delete</button>
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

export default AdminDash;
