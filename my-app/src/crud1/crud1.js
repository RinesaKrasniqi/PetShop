import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../postman-dashboard/postman-dashboardcss.css'; // Updated CSS
import { FaTelegramPlane, FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

function NdertesaDash() {
  const [ndertesas, setNdertesas] = useState([]);
  const [ndertesaCount, setNdertesaCount] = useState(0);

  // Load Ndertesa records from the server
  const loadNdertesas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Ndertesa58700');
      console.log('API Response:', response.data.recordset);  // Log the entire response to check its structure

      // Ensure the response is an array and set the data
      if (Array.isArray(response.data.recordset)) {
        setNdertesas(response.data.recordset);
      } else {
        console.error('Unexpected response format:', response.data.recordset); // Debugging unexpected format
        setNdertesas([]); // Fallback to empty array in case of error
      }
    } catch (error) {
      console.error('Error loading Ndertesa data:', error);
      setNdertesas([]); // Fallback to empty array in case of error
    }
  };

  // Delete Ndertesa record
  const deleteNdertesa = async (ndertesa_id) => {
    try {
      await axios.delete(`http://localhost:5000/Ndertesa58700/${ndertesa_id}`);
      loadNdertesas(); // Reload Ndertesas after deletion
    } catch (error) {
      console.error('Error deleting Ndertesa:', error);
    }
  };

  // Format date to show only the date part (YYYY-MM-DD)
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };

  // Load Ndertesas when the component mounts
  useEffect(() => {
    loadNdertesas();
  }, []);

  // Update Ndertesa count when Ndertesa list changes
  useEffect(() => {
    setNdertesaCount(ndertesas.length);
  }, [ndertesas]);

  return (
    <div className="back-dash">
      <div className="first-div-a">
        <div className="Admin-Dash-Title">
          <p className="FaHome"><FaHome /> Dashboard</p>
        </div>
        <div className="elements">
          <div className="elements-1">
            <FaTelegramPlane color="white" size="22px" />
            <Link to="/ndertesa" className="link">Ndertesa</Link>
          </div>
          <div className="elements-1">
            <FaTelegramPlane color="white" size="22px" />
            <Link to="/ashensori" className="link">Ashensori</Link>
          </div>
          <div className="elements-3">
            <img className="add-product-img" src="./Img/add-product.png" alt="Add Product" />
            <Link to="/addcrud1">
              <button className="add-product">Insert</button>
            </Link>
          </div>
          <div className="elements-2">
            <img className="amdin-logout" src="./Img/logout-admin.png" alt="Logout" />
            <Link to="/home">
              <button className="a-d-logout">Log out</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="both-back">
        <div className="second-div-a">
          <h2 className="user-h2">Ndertesa List:</h2>
          <div className="user">
            <table className="user-table">
              <thead className="user-head">
                <tr className="user-tr">
                  <th className="user-td">ID</th>
                  <th className="user-td">Emertimi</th>
                  <th className="user-td">Data</th>
                  <th className="user-td">Update</th>
                  <th className="user-td">Delete</th>
                </tr>
              </thead>
              <tbody className="bottom-table">
                {ndertesas.map((ndertesa) => (
                  <tr className="bottom-tr" key={ndertesa.ndertesa_id}>
                    <td className="bottom-td">{ndertesa.ndertesa_id || 'ID not found'}</td>
                    <td className="bottom-td">{ndertesa.emertimi58700}</td>
                    <td className="bottom-td">{formatDate(ndertesa.dataPt)}</td>
                    <td className="bottom-td">
                      <Link to={`/updateNdertesa58700/${ndertesa.ndertesa_id || 'ID not found'}`}>
                        <button className="upd-btn">Update</button>
                      </Link>
                    </td>
                    <td className="bottom-td">
                      <button
                        className="dlt-btn"
                        onClick={() => deleteNdertesa(ndertesa.ndertesa_id || 'ID not found')}
                      >
                        Delete
                      </button>
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

export default NdertesaDash;
