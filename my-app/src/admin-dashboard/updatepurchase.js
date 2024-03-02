import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './addcss.css';
import axios from 'axios';


const UpdatePurchase = () => {
  const {Cart_id } = useParams();
  const [Description, setDescription] = useState('');
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  console.log("Cart_Id:", Cart_id);
   const getPurchaseId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/purchase/edit/${Cart_id}`);
        const purchase = response.data[0];
        console.log(purchase);
        setDescription(purchase.Description);
        setName(purchase.Name);
        setPrice(purchase.Price);
        setQuantity(purchase.quantity);
      } catch (error) {
        console.error(error);
      }
     };
    getPurchaseId();
  }, [Cart_id]);
  
  

  const update =  (e) => {
    e.preventDefault();
    try {
       axios.put(`http://localhost:5000/purchase/update/${Cart_id}`, {
        Description: Description,
        Name: Name,
        Price: Price,
        quantity:quantity,
      });
      navigate('/admin-purchases');
    } catch (error) {
      console.error("Error gurl", error);
    }
  };

  return (
    <div>
      <div className="formaadd">
        <h2 className="h2add">Update Purchase here!</h2>
        <form className="add-form">
          <input
            className="inputform"
            type="text"
            placeholder="Description"
            id="Description"
            Emri="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Name"
            id="Name"
            name="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Price"
            id="Price"
            name="Price"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="quantity"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className="updateproduct-btn" type="submit" onClick={update}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePurchase;
