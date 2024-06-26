import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './postman-dashboardcss.css';
import { FaUserAlt, FaMoneyBill, FaShoppingBasket, FaTelegramPlane, FaHome } from "react-icons/fa";
import Popup from './popup.js';

function PostDash() {
  const { Cart_id } = useParams();
  const [adminDelivered, setAdminDelivered] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handlePopup = (productData) => {
    setButtonPopup(true);
    setSelectedProductId(productData.Cart_Id);
    setDeliveryStatus(productData.delivery);
  };

  const loadDelivery = async () => {
    try {
      const response = await axios.get('http://localhost:5000/adminDelivered');
      setAdminDelivered(response.data);
    } catch (error) {
      console.log('Error loading users:', error);
    }
  };

  const updateDelivery = async (Cart_Id, delivery) => {
    try {
      await axios.put(`http://localhost:5000/delivery/update/${Cart_Id}`, { delivery: delivery });

      loadDelivery();
      setButtonPopup(false);
    } catch (error) {
      console.error('Error updating delivery:', error);
    }
  };

  const handleDeliveryChange = (e) => {
    let newDeliveryStatus = e.target.value;
    setDeliveryStatus(newDeliveryStatus);
  };

  useEffect(() => {
    loadDelivery();
  }, []);

  return (
    <div className='back-dash'>
      <div className='first-div-a'>
        <div className='Admin-Dash-Title'>
          <p className='FaHome-post'>Dashboard</p>
        </div>
        <div className='elements-post'>
          <div className='elements-1-post'>
          <FaMoneyBill color="white" size="22px" />
            <Link to='/post-purchases' className='link'>
              Purchases Made
            </Link>
          </div>
          <div className='elements-1-post'>
          <FaTelegramPlane color='white' size='22px' />
            <Link to='/post-deliveries' className='link'>
              Deliveries Sent
            </Link>
          </div>
          <div className='elements-2-post'>
            <Link to='/home'>
              <button className='a-d-logout'>Log out</button>
            </Link>
          </div>
        </div>
      </div>

      <div className='second-div-a'>
        <h2 className='post-h2'>Purchase list:</h2>
        <div className='post'>
          <table className='post-table'>
            <thead className='post-head'>
              <tr className='post-tr'>
                <td className='post-td'>Purchase ID</td>
                <td className='post-td'>Client Id</td>
                <td className='post-td'>Product Name</td>
                <td className='post-td'>Ship</td>
              </tr>
            </thead>
            <tbody className='bottom-table-post'>
              {adminDelivered.map((purchase) => (
                <tr key={purchase.Product_id} className='bottom-tr-post'>
                  <td className='bottom-td-post'>{purchase.Product_id}</td>
                  <td className='bottom-td-post'>{purchase.Client_id}</td>
                  <td className='bottom-td-post'>{purchase.Name}</td>
                  <td className='bottom-td-post'>{purchase.delivery}</td>
                  <td className='ship-btn-td'>
                    <button className='ship-btn' onClick={() => handlePopup(purchase)}>
                      Ship
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} productID={selectedProductId}>
        <h2 className='h2-post'>Shipment</h2>
        <div className='registerform-post'>
          <select className='inputform-post' value={deliveryStatus} onChange={handleDeliveryChange}>
            <option value=''>Select Delivery Status</option>
            <option value='on the way'>On the Way</option>
            <option value='delivered'>Delivered</option>
          </select>
        </div>
        <div key={selectedProductId}>
          <button className='save' onClick={() => updateDelivery(selectedProductId, deliveryStatus)}>Save</button>
        </div>
      </Popup>
    </div>
  );
}

export default PostDash;
