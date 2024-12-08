import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin-dashboardcss.css';
import { FaUserAlt, FaShoppingBasket, FaMoneyBill, FaTelegramPlane, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AdminDash() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  // Load users from the server
  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user');
      setUsers(response.data.recordset); // assuming response.data is an array of users
    } catch (error) {
      console.log('Error loading users:', error);
    }
  };

  // Delete user
  const deleteUser = async (clientId) => {
    try {
      await axios.delete(`http://localhost:5000/user/${clientId}`);
      loadUsers(); // Reload users after deletion
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  // Load users when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  // Update user count when users array changes
  useEffect(() => {
    setUserCount(users.length);
  }, [users]);

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
          
          <div className='elements-2'>
            <img className='amdin-logout' src='./Img/logout-admin.png' alt="Logout" />
            <Link to='/home'><button className='a-d-logout'>Log out</button></Link>
          </div>
        </div>
      </div>

      <div className="both-back">
        <div className="user-div-nr">
          <div className="acc-dash"><img className="acc-dash-pic" src="./Img/acc-dash.png" alt="Account Dashboard" /></div>
          <p className="acc-dash-p">All Users:</p>
          <p className="acc-dash-pp">{userCount}</p>
        </div>

        <div className="second-div-a">
          <h2 className="user-h2">User list:</h2>
          <div className="user">
            <table className="user-table">
              <thead className="user-head">
                <tr className="user-tr">
                  <th className="user-td">ID</th>
                  <th className="user-td">First Name</th>
                  <th className="user-td">Last Name</th>
                  <th className="user-td">Email</th>
                  <th className="user-td">Phone</th>
                  <th className="user-td">Update</th>
                  <th className="user-td">Delete</th>
                </tr>
              </thead>
              <tbody className="bottom-table">
                {users.map((user) => (
                  <tr className="bottom-tr" key={user.Client_id}>
                    <td className="bottom-td">{user.Client_id}</td>
                    <td className="bottom-td">{user.name}</td>
                    <td className="bottom-td">{user.surname}</td>
                    <td className="bottom-td">{user.email}</td>
                    <td className="bottom-td">{user.phone}</td>
                    <td className="bottom-td">
                      <Link to={`/updateUser/${user.Client_id}`}>
                        <button className="upd-btn">Update</button>
                      </Link>
                    </td>
                    <td className="bottom-td">
                      <button className="dlt-btn" onClick={() => deleteUser(user.Client_id)}>Delete</button>
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

export default AdminDash;
