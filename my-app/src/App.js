import logo from './logo.svg';
import Header from './Components/header.js';
import Footer from  './Components/footer.js';
import React,{useState} from "react";
import Login from "./login/login.js";
import Register from "./register/register.js";
import Products from "./products/products.js";
import Shop from "./shop/shop.js";
import {motion} from "framer-motion";
import Home from  './home/home.js';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AdminDash from './admin-dashboard/admin-dashboard';
import PostDash from './postman-dashboard/postman-dashboard';
import UserHome from './user-dashboard/User-Home/user-home.js';
import UserCart from './user-dashboard/User-Cart/user-cart.js';


function App() {

  return (
    <div>
     <Home/>
    </div>
  );
}

export default App;
