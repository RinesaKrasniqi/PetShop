import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserAlt, FaMoneyBill, FaShoppingBasket, FaTelegramPlane, FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

function AdminPurchases() {
  const [pro, setPro] = useState([]);

  const loadPurchases = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/purchased`, {
        withCredentials: true,
      });
      if (Array.isArray(response.data)) {
        setPro(response.data);
      } else {
        console.error('Data received is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  return (
    <div className="back-dash">
      <div className="first-div-a">
        <div className="Admin-Dash-Title">
          <p className="FaHome">Dashboard</p>
        </div>

        <div className="elements">
          <div className="elements-1">
            <FaUserAlt color="white" size="22px" />
            <Link to="/admin-dashboard" className="link">
              Users
            </Link>
          </div>
          <div className="elements-1">
            <FaShoppingBasket color="white" size="22px" />
            <Link to="/admin-products" className="link">
              Products
            </Link>
          </div>
          <div className="elements-1">
            <FaMoneyBill color="white" size="22px" />
            <Link to="/admin-purchases" className="link">
              Purchases
            </Link>
          </div>
          <div className="elements-1">
            <FaTelegramPlane color="white" size="22px" />
            <Link to="/admin-deliveries" className="link">
              Deliveries
            </Link>
          </div>
          <div className="elements-3">
            <img className="add-product-img" src="./Img/add-product.png" />
            <Link to="/add">
              <button className="add-product">Add product</button>
            </Link>
          </div>
          <div className="elements-2">
            <img className="amdin-logout" src="./Img/logout-admin.png" />
            <Link to="/home">
              <button className="a-d-logout">Log out</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="both-back">
        <div className="user-div-nr">
          <div className="acc-dash">
            <img className="acc-dash-pic" src="./Img/acc-dash.png" />
          </div>
          <p className="acc-dash-p">Products:</p>
          <p className="acc-dash-pp">{pro.length}</p>
        </div>

        <div className="second-div-a">
          <h2 className="user-h2">Product list:</h2>
          <div className="user">
            <table className="user-table">
              <thead className="user-head">
                <tr className="user-tr">
                  <th className="user-td">product Id</th>
                  <th className="user-td">client id</th>
                  <th className="user-td">Description</th>
                  <th className="user-td">Name</th>
                  <th className="user-td">Price</th>
                  <th className="user-td">nr purchased</th>
                  <th className="user-td">Update</th>
                  <th className="user-td">Delete</th>
                </tr>
              </thead>
              <tbody className="bottom-table">
                {pro.map((product) => (
                  <tr key={product.Product_id} className="bottom-tr">
                    <td className="bottom-td">{product.Product_id}</td>
                    <td className="bottom-td">{product.Client_id}</td>
                    <td className="bottom-td">{product.Description}</td>
                    <td className="bottom-td">{product.Name}</td>
                    <td className="bottom-td">{product.Price}$</td>
                    <td className="bottom-td">{product.quantity}</td>
                    <td className="bottom-td">Update</td>
                    <td className="bottom-td">
                      <button className="dltt-btn">Delete</button>
                    </td>
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

export default AdminPurchases;
