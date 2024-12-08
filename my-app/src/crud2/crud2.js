import { useState, useEffect } from 'react';
import '../postman-dashboard/postman-dashboardcss.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTelegramPlane } from "react-icons/fa";

function Ashensori() {
  const [Ashensori58700, setAshensori58700] = useState([]);
  const [ndertesaNames, setNdertesaNames] = useState([]); // Stores the list of ndertesa

  // Load Ashensori data
  const LoadAshensori58700 = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Ashensori58700');
      setAshensori58700(response.data.recordset || []);
    } catch (error) {
      console.error('Error fetching Ashensori:', error);
    }
  };

  // Load Ndertesa data
  const LoadNdertesaNames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Ndertesa58700');
      setNdertesaNames(response.data.recordset || []);
    } catch (error) {
      console.error('Error fetching Ndertesa:', error);
    }
  };

  // Delete Ashensori record
  const deleteAshensori = async (ashensori_id) => {
    try {
      await axios.delete(`http://localhost:5000/Ashensori58700/${ashensori_id}`);
      LoadAshensori58700();
    } catch (error) {
      console.error('Error deleting Ashensori:', error);
    }
  };

  // Map `ndertesa_id` to `ndertesa_name`
  const getNdertesaName = (ndertesa_id) => {
    const ndertesa = ndertesaNames.find((n) => n.ndertesa_id === ndertesa_id);
    return ndertesa ? ndertesa.emertimi58700 : 'Unknown'; // Default to 'Unknown' if no match is found
  };

  useEffect(() => {
    LoadAshensori58700();
    LoadNdertesaNames();
  }, []);

  return (
    <div className="back-dash">
      <div className="first-div-a">
        <div className="Admin-Dash-Title">
          <p className="FaHome-post">Dashboard</p>
        </div>

        <div className="elements-post">
          <div className="elements-1-post">
            <FaTelegramPlane color="white" size="22px" />
            <Link to="/ndertesa" className="link">
              ndertesa
            </Link>
          </div>
          <div className="elements-1-post">
            <FaTelegramPlane color="white" size="22px" />
            <Link to="/ashensori" className="link">
              ashensori
            </Link>
          </div>
          <div className="elements-3">
            <img className="add-product-img" src="./Img/add-product.png" alt="Add Product" />
            <Link to="/addcrud2">
              <button className="add-product">Insert</button>
            </Link>
          </div>
          <div className="elements-2-post">
            <img className="amdin-logout" src="./Img/logout-admin.png" alt="Logout" />
            <Link to="/home">
              <button className="a-d-logout">Log out</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="second-div-a">
        <h2 className="post-h2">Ashensori:</h2>
        <div className="post">
          <table className="post-table">
            <thead className="post-head">
              <tr className="post-tr">
                <td className="post-td">ID</td>
                <td className="post-td">Emertimi</td>
                <td className="post-td">Ndertesa Name</td>
                <td className="post-td">Update</td>
                <td className="post-td">Delete</td>
              </tr>
            </thead>
            <tbody className="bottom-table-post">
              {Ashensori58700.map((ashensori) => (
                <tr className="bottom-tr-post" key={ashensori.ashensori_id}>
                  <td className="bottom-td-post">{ashensori.ashensori_id}</td>
                  <td className="bottom-td-post">{ashensori.emertimi58700}</td>
                  <td className="bottom-td-post">{getNdertesaName(ashensori.ndertesa_id)}</td>
                  <td className="ship-btn-td">
                    <Link to={`/updateAshensori/${ashensori.ashensori_id}`}>
                      <button className="ship-btn">Update</button>
                    </Link>
                  </td>
                  <td className="ship-btn-td">
                    <button className="ship-btn" onClick={() => deleteAshensori(ashensori.ashensori_id)}>
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
  );
}

export default Ashensori;
