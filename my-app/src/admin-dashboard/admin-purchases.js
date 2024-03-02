import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserAlt, FaMoneyBill, FaShoppingBasket, FaTelegramPlane, FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import Cart from '../addtocart/addtocart';
import './admin-dashboardcss.css';
=======
import Pagination from './Pagination';
>>>>>>> 336bb8c0fcd2eea29294383de0d334a9696cbeed

function AdminPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const purchasesPerPage = 5;

  const loadPurchases = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/purchased`, {
        withCredentials: true,
      });
      if (Array.isArray(response.data)) {
        setPurchases(response.data);
      } else {
        console.error('Data received is not an array:', response.data);
      }
    } catch (error) {
<<<<<<< HEAD
      console.error('Error loading cart:', error);
=======
      console.error('Error loading purchases:', error);
>>>>>>> 336bb8c0fcd2eea29294383de0d334a9696cbeed
    }
  };
  
  const deletePurchase = async (Cart_Id) => {
    try {
      await axios.delete(`http://localhost:5000/cartpurchase/${Cart_Id}`);
      loadPurchases();
    } catch (error) {
      console.error('Error deleting cart:', error);
    } 
  };

  useEffect(() => {
    loadPurchases();
  }, []);
  
  useEffect(() => {
    console.log('Purchases:', pro);
  }, [pro]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPurchase = currentPage * purchasesPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - purchasesPerPage;
  const currentPurchases = purchases.slice(indexOfFirstPurchase, indexOfLastPurchase);

  return (
    <div className="back-dash">
      <div className="first-div-a">
        <div className="Admin-Dash-Title">
          <p className="FaHome"><FaHome /> Dashboard</p>
        </div>

        <div className="elements">
          <div className="elements-1">
            <FaUserAlt color="white" size="22px" />
            <Link to="/admin-dashboard" className="link">Users</Link>
          </div>
          <div className="elements-1">
            <FaShoppingBasket color="white" size="22px" />
            <Link to="/admin-products" className="link">Products</Link>
          </div>
          <div className="elements-1">
            <FaMoneyBill color="white" size="22px" />
            <Link to="/admin-purchases" className="link">Purchases</Link>
          </div>
          <div className="elements-1">
            <FaTelegramPlane color="white" size="22px" />
            <Link to="/admin-deliveries" className="link">Deliveries</Link>
          </div>
          <div className="elements-3">
            <img className="add-product-img" src="./Img/add-product.png" alt="Add product" />
            <Link to="/add">
              <button className="add-product">Add product</button>
            </Link>
          </div>
          <div className="elements-2">
            <img className="amdin-logout" src="./Img/logout-admin.png" alt="Admin Logout" />
            <Link to="/home">
              <button className="a-d-logout">Log out</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="both-back">
        <div className="user-div-nr">
          <div className="acc-dash">
            <img className="acc-dash-pic" src="./Img/acc-dash.png" alt="Account Dashboard" />
          </div>
          <p className="acc-dash-p">Products:</p>
          <p className="acc-dash-pp">{purchases.length}</p>
        </div>

        <div className="second-div-a">
          <h2 className="user-h2">Product list:</h2>
          <div className="user">
            <table className="user-table">
              <thead className="user-head">
                <tr className="user-tr">
                  <th className="user-td">Cart Id</th>
                  <th className="user-td">Client Id</th>
                  <th className="user-td">Description</th>
                  <th className="user-td">Name</th>
                  <th className="user-td">Price</th>
                  <th className="user-td">Quantity Purchased</th>
                  <th className="user-td">Update</th>
                  <th className="user-td">Delete</th>
                  <th className="user-td">Validate</th>
                </tr>
              </thead>
              <tbody className="bottom-table">
<<<<<<< HEAD
                {pro.map((product) => (
                  <tr key={product.Cart_Id} className="bottom-tr">
                    <td className="bottom-td">{product.Cart_Id}</td>
                    <td className="bottom-td">{product.Client_id}</td>
                    <td className="bottom-td">{product.Description}</td>
                    <td className="bottom-td">{product.Name}</td>
                    <td className="bottom-td">{product.Price}$</td>
                    <td className="bottom-td">{product.quantity}</td>
=======
                {currentPurchases.map((purchase) => (
                  <tr key={purchase.Product_id} className="bottom-tr">
                    <td className="bottom-td">{purchase.Product_id}</td>
                    <td className="bottom-td">{purchase.Client_id}</td>
                    <td className="bottom-td">{purchase.Description}</td>
                    <td className="bottom-td">{purchase.Name}</td>
                    <td className="bottom-td">{purchase.Price}$</td>
                    <td className="bottom-td">{purchase.quantity}</td>
                    <td className="bottom-td">Update</td>
>>>>>>> 336bb8c0fcd2eea29294383de0d334a9696cbeed
                    <td className="bottom-td">
                       <Link to={`/purchase/update/${product.Cart_Id}`}>
                        <button className="upd-btn">Update</button>
                      </Link>
                     
                    </td>
                    <td className="bottom-td">
                      <button className="delete-button"
                        onClick={() => deletePurchase(product.Cart_Id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td className="bottom-td">
                      <button className="validate-btn">
                        Validate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={Math.ceil(purchases.length / purchasesPerPage)}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPurchases;
