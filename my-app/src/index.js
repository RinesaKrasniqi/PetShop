import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import App from './App';
import Shop from './shop/shop.js';
import Dog from './dog/dog.js'
import Pony from './pony/pony.js'
import Fish from './fish/fish.js';
import Fleas from './fleasandticks/fleasandticks'
import Login from "./login/login.js";
import Cart from './addtocart/addtocart.js';
import Register from "./register/register.js";
import Products from "./products/products.js";
import reportWebVitals from './reportWebVitals';
import Home from  './home/home.js';
import AdminDash from './admin-dashboard/admin-dashboard';
import AdminProducts from './admin-dashboard/admin-products';
import AdminPurchases from './admin-dashboard/admin-purchases';
import AdminDeliveries from './admin-dashboard/admin-deliveries';
import Add from './admin-dashboard/add.js';
import UpdateUser from './admin-dashboard/updateUser.js';
import UserCart from './user-dashboard/User-Cart/user-cart.js';
import UserHome from './user-dashboard/User-Home/user-home.js';
import UserDog from './user-dashboard/User-Home/user-dog.js';
import UserCat from './user-dashboard/User-Home/user-cat.js';
import UserFish from './user-dashboard/User-Home/user-fish.js';
import UserPony from './user-dashboard/User-Home/user-pony';
import UserPurchased from './user-dashboard/User-Purchased/user-purchased.js';
import UpdateProduct  from './admin-dashboard/updateProduct.js';
import PurchaseSuccess from './payment/PurchaseSuccess';
import UserFleas from './user-dashboard/User-Home/user-fleas';
import UserShop from './user-dashboard/User-Home/usershop';
import UserHeader from './user-dashboard/User-Home/user-header';
import LoginHeader from './Components/loginheader';
<<<<<<< HEAD
import UpdatePurchase from './admin-dashboard/updatepurchase.js';
=======
>>>>>>> bd8255833c9bda787a4ad0ecd9ffc138e4b0f301
import PostDeliveries from './postman-dashboard/post-deliveries';
import PostDash from './postman-dashboard/postman-dashboard';
import UpdatePurchase from './admin-dashboard/updatepurchase.js';

///
 import Sculptor from './lab-crud/team.js';
 import Sculpture from './lab-crud/player.js';
 import AddSculptor from './lab-crud/addteam.js';
 import AddSculpture from './lab-crud/addplayer.js';
//  import UpdateSculptor from './lab-crud/updatesculptor.js';
//  import UpdateSculpture from './lab-crud/updatesculpture.js';

import AddPlayer from './lab-crud/addplayer.js';
import AddTeam from './lab-crud/addteam.js';
import Player from './lab-crud/player.js';
import Team from './lab-crud/team.js';
import UpdateTeam from './lab-crud/updateteam.js';

<<<<<<< HEAD
import Crud1 from './detyra/Crud1.js';
import UpdateCrud1 from './detyra/UpdateCrud1.js';
import AddCrud1 from './detyra/AddCrud1.js';
=======
>>>>>>> bd8255833c9bda787a4ad0ecd9ffc138e4b0f301

import Crud2 from './detyra/Crud2.js';
import UpdateCrud2 from './detyra/UpdateCrud2.js';
import AddCrud2 from './detyra/AddCrud2.js';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "",
    element: <div><App/></div>
  },
  {
    path: "home",
    element: <div><Home/></div>
  },
  {
    path: "signup",
    element: <div><Register/></div>
  },
  {
    path: "cat",
    element: <div><Products/></div>
  },
  {
    path: "dog",
    element: <div><Dog/></div>
  },
  {
    path: "pony",
    element: <div><Pony/></div>
  },
  {
    path: "Fish",
    element: <div><Fish/></div>
  },
  {
    path: "signup",
    element: <div><Register/></div>
  },
  {
    path: "login",
    element: <div><Login/></div>
  },
  {
    path: "/login",
    element: <div></div>
  },
  {
    path: "fleasandticks",
    element: <div><Fleas/></div>
  },
  {
    path: "addtocart",
    element: <div><Cart/></div>
  },
  {
    path: "/products/edit/:Product_id",
    element: <div><Shop/></div>
  },
  
  {
    path: "/shop/:Product_id",
    element: <div><UserShop/></div>
  },
  {
    path: "admin-dashboard",
    element: <div><AdminDash/></div>
  },
  {
    path: "admin-products",
    element: <div><AdminProducts/></div>
  },
  {
    path: "admin-purchases",
    element: <div><AdminPurchases/></div>
  },
  {
    path: "admin-deliveries",
    element: <div><AdminDeliveries/></div>
  },
  {
    path: "add",
    element: <div><Add/></div>
  },
  {
    path: "updateUser/:Client_id",
    element: <div><UpdateUser/></div>
  },
  {
    path: "updateProduct/:Product_id",
    element: <div><UpdateProduct/></div>
  },
  {
    path: "/purchase/update/:Cart_id",
    element: <div><UpdatePurchase/></div>
  }, 
  {
    path: "/purchase/edit/:Cart_id",
    element: <div></div>
  }, 
  {
    path: "post-purchases",
    element: <div><PostDash/></div>
  },
  {
    path: "post-deliveries",
    element: <div><PostDeliveries/></div>
  },
  {
    path: "user-cart",
    element: <div><UserCart/></div>
  },
  {
    path: "user-home",
    element: <div><UserHome/></div>
  },
  {
    path: "user-dog",
    element: <div><UserDog/></div>
  },
  {
    path: "user-cat",
    element: <div><UserCat/></div>
  },
  {
    path: "user-fish",
    element: <div><UserFish/></div>
  },
  {
    path: "user-pony",
    element: <div><UserPony/></div>
  },
  {
    path: "/users/edit/:Client_id",
    element: <div></div>
  },
  {
    path: "/users/update/:Client_id",
    element: <div></div>
  },
  {
  path: "/products/edit/:Product_id",
  element: <div></div>
  },
  {
  path: "/products/update/:Product_id",
  element: <div></div>
  },
  {
    path: "user-purchased",
    element: <div><UserPurchased/></div>
  },
  {
    path: "/checkout-success",
    element: <div><PurchaseSuccess/></div>
  },
  {
    path: "/userfleas",
    element: <div><UserFleas/></div>
  },{
    path: "/loginheader",
    element: <div><LoginHeader/></div>
  },
  // {
  //   path: "/cart/edit/:Cart_id",
  //   element: <div></div>
  // },
  // {
  //   path: "/cart/update/:Cart_id",
  //   element: <div></div>
  // },
  {
    path: "/category",
    element: <div></div>
  },
  {
    path: "/purchased",
    element: <div></div>
  },
  {
    path: "/purchaseProduct/:Client_id",
    element: <div></div>
  },
  {
    path: "/stripe/purchaseProduct/:Client_id",
    element: <div></div>
  },
  {
    path: "/cartpurchase/:Cart_Id",
    element: <div></div>
  },
  {
    path: "/purchased",
    element: <div></div>
  }
  ,
  {
    path: "/validate/:Cart_Id",
    element: <div></div>
  }
  ,
  {
    path: "/delivery/edit/:Cart_id",
    element: <div></div>
  },
<<<<<<< HEAD
  {
    path: "/delivery/update/:Cart_id",
    element: <div></div>
  },


  {
    path: "/crud1",
    element: <div><Crud1/></div>
  },
  {
    path: "/sculptor/del/:sculptorId",
    element: <div></div>
  },
  {
    path: "/crud1/edit/:TeamId",
    element: <div></div>
  },
  {
    path: "/crud1/update/:TeamId",
    element: <div></div>
  },
  {
    path: "/crud1/updateC/:TeamId",
    element: <div><UpdateCrud1/></div>
  },
  {
    path: "/addcrud1",
    element: <div><AddCrud1/></div>
  }
  ,
  {
    path: "/crud2",
    element: <div><Crud2/></div>
  }, 
  {
    path: "/crud2/del/:sculptureId",
    element: <div></div>
  },
  ,
  {
    path: "/crud2/updateC/:sculptureId",
    element: <div><UpdateCrud2/></div>
  },
  {
    path: "/crud2/edit/:sculptureId",
    element: <div></div>
  },
  {
    path: "/crud2/update/:sculptureId",
    element: <div></div>
  },
  {
    path: "/addcrud2",
    element: <div><AddCrud2/></div>
  }
=======






  {
    path: "/Team",
    element: <div><Team/></div>
  },
  {
    path: "/addTeam",
    element: <div><AddTeam/></div>
  },
  {
    path: "/updateTeam/:TeamId",
    element: <div><UpdateTeam/></div>
  },
  {
    path: "/Team/edit/:TeamId",
    element: <div></div>
  },
  // {
  //   path: "/delSculptor/:SculptorId",
  //   element: <div></div>
  // },
  // {
  //   path: "/deleteSculptor/:SculptorId",
  //   element: <div></div>
  // },






  {
    path: "/Player",
    element: <div><Sculpture/></div>
  },
  // {
  //   path: "/Sculpture/edit/:SculptureId",
  //   element: <div><UpdateSculpture/></div>
  // },
  // {
  //   path: "/updateSculpture/:SculptureId",
  //   element: <div><UpdateSculpture/></div>
  // },
  {
    path: "/addPlayer",
    element: <div><AddPlayer/></div>
  },
  {
    path: "/deletePlayer/:PlayerId",
    element: <div></div>
  },
  
>>>>>>> bd8255833c9bda787a4ad0ecd9ffc138e4b0f301

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
