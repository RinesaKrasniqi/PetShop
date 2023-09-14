import { useRef, useState, useEffect } from 'react';
import './admin-dashboardcss.css';
import axios from 'axios';
import { FaRegStar } from 'react-icons/fa';
import { FaPaw } from 'react-icons/fa';
import { FaOpencart } from 'react-icons/fa';
import { FaCartPlus } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaMoneyBill } from 'react-icons/fa';
import { FaShoppingBasket } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Header from '../Components/header.js';
import Footer from '../Components/footer.js';
import { Link } from 'react-router-dom';

function AdminProducts() {
  const [pro, setPro] = useState([]);
  const [allfoto, setAllFoto] = useState([]);
  const [productCount, setProductCount] = useState(0);

  const LoadProduct = async () => {
    const response = await axios.get('http://localhost:5000/product');
    console.log(response.data);
    setPro(response.data);
  };

  const deleteProduct = async (Product_id) => {
    try {
      await axios.delete(`http://localhost:5000/product/${Product_id}`);
      LoadProduct();
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  const getFoto = async () => {
    try {
      const result = await axios.get('http://localhost:5000/get-foto');
      console.log(result.data); // Check the data returned from the server
      setAllFoto(result.data.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    LoadProduct();
    getFoto();
  }, []);

  useEffect(() => {
    setProductCount(pro.length);
  }, [pro]);

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
          <p className="acc-dash-pp">{productCount}</p>
        </div>

        <div className="second-div-a">
          <h2 className="user-h2">Product list:</h2>
          <div className="user">
            <table className="user-table">
              <thead className="user-head">
                <tr className="user-tr">
                  <td className="user-td">Id</td>
                  <td className="user-td">Description</td>
                  <td className="user-td">Name</td>
                  <td className="user-td">Price</td>
                  <td className="user-td">In Stock</td>
                  <td className="user-td">Stars</td>
                  <td className="user-td">Category</td>
                  <td className="user-td">IMG-src</td>
                  <td className="user-td">Update</td>
                  <td className="user-td">Delete</td>
                </tr>
              </thead>
              <tbody className="bottom-table">
                {pro.map((product, index) => (
                  <tr className="bottom-tr" key={product.Product_id}>
                    <td className="bottom-td">{product.Product_id}</td>
                    <td className="bottom-td">{product.Description}</td>
                    <td className="bottom-td">{product.Name}</td>
                    <td className="bottom-td">{product.Price}</td>
                    <td className="bottom-td">{product.nr_in_stock}</td>
                    <td className="bottom-td">{product.nr_of_stars}</td>
                    <td className="bottom-td">{product.Category}</td>
                    <td className="bottom-td">
                      {allfoto ? (
                        allfoto.map((foto, index) => (
                          <img
                            src={`/Images/${foto.foto}`}
                            key={index}
                            alt={`Product Image - ${product.Name}`}
                            onError={(e) => {
                              console.error('Image loading error:', e);
                              e.target.style.display = 'none'; // Hide the image if there's an error
                            }}
                          />
                        ))
                      ) : (
                        <span>Loading Images...</span> // or any loading indicator
                      )}
                    </td>
                    <td className="bottom-td">
                      <Link to={`/updateProduct/${product.Product_id}`}>
                        <button className="upd-btn">Update</button>
                      </Link>
                    </td>
                    <td className="bottom-td">
                      <button
                        className="dltt-btn"
                        onClick={() => deleteProduct(product.Product_id)}
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

export default AdminProducts;