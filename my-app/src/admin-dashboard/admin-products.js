import React, { useState, useEffect } from 'react';
import './admin-dashboardcss.css';
import axios from 'axios';
import { FaUserAlt, FaShoppingBasket, FaMoneyBill, FaTelegramPlane, FaHome } from 'react-icons/fa';
import Pagination from './Pagination'; 
import Header from '../Components/header.js';
import Footer from '../Components/footer.js';
import { Link } from 'react-router-dom';

function AdminProducts() {
  const [pro, setPro] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [productCount, setProductCount] = useState(0);
  const [file, setFile] = useState(null); 
  const [foto, setFoto] = useState({ image: '' });

  const loadProduct = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product');
      setPro(response.data);
    } catch (error) {
      console.log('Error loading products:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/product/${productId}`);
      loadProduct();
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  const handleInsert = () => {
    const formData = new FormData();
    formData.append('foto', file);
    axios.post('http://localhost:3000/insert', formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        if (Array.isArray(response.data) && response.data.length > 0) {
          setFoto(response.data[0]); // Assuming you want the first item from response.data
        } else {
          console.error('No data received from the API.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    loadProduct();
  }, []); 

  useEffect(() => {
    setProductCount(pro.length);
  }, [pro]);



  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = pro.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

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
            <img className="add-product-img" src="./Img/add-product.png" alt="Add Product" />
            <Link to="/add">
              <button className="add-product">Add product</button>
            </Link>
          </div>
          <div className='elements-2'>
            <img className='amdin-logout' src='./Img/logout-admin.png'></img>
            <Link to='/home'><button class='a-d-logout'>Log out</button></Link>
            </div>
        </div>
      </div>

      <div className="both-back">
        <div className="user-div-nr">
          <div className="acc-dash">
            <img className="acc-dash-pic" src="./Img/acc-dash.png" alt="Account Dashboard" />
          </div>
          <p className="acc-dash-p">Products:</p>
          <p className="acc-dash-pp">{productCount}</p>
        </div>

        <div className="second-div-a">
          <div className="user">
            <table className="user-table">
              <thead className="user-head">
                <tr className="user-tr">
                  <th className="user-td">Id</th>
                  <th className="user-td">Description</th>
                  <th className="user-td">Name</th>
                  <th className="user-td">Price</th>
                  <th className="user-td">In Stock</th>
                  <th className="user-td">Stars</th>
                  <th className="user-td">Category</th>
                  <th className="user-td">IMG-src</th>
                  <th className="user-td">Update</th>
                  <th className="user-td">Delete</th>
                </tr>
              </thead>
              <tbody className="bottom-table">
                {currentProducts.map(product => (
                  <tr className="bottom-tr" key={product.Product_id}>
                    <td className="bottom-td">{product.Product_id}</td>
                    <td className="bottom-td">{product.Description}</td>
                    <td className="bottom-td">{product.Name}</td>
                    <td className="bottom-td">{product.Price}</td>
                    <td className="bottom-td">{product.nr_in_stock}</td>
                    <td className="bottom-td">{product.nr_of_stars}</td>
                    <td className="bottom-td">{product.Category}</td>
                    <td className="bottom-td">
                      <img className='foto-rresht' src={`Img/${product.foto}`} alt={product.Name} />
                    </td>
                    <td className="bottom-td">
                      <Link to={`/updateProduct/${product.Product_id}`}>
                        <button className="upd-btn">Update</button>
                      </Link>
                    </td>
                    <td className="bottom-td">
                      <button className="dltt-btn" onClick={() => deleteProduct(product.Product_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
        totalPages={Math.ceil(pro.length / productsPerPage)}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
      </div> 

      
  );
}

export default AdminProducts;
