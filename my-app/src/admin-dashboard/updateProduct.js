import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './addcss.css';
import axios from 'axios';

const UpdateProduct = () => {
  const { Product_id } = useParams(); // Make sure parameter name matches the route parameter
  const [product, setProduct] = useState({});
  const [Description, setDescription] = useState('');
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [nr_in_stock, setNr_in_stock] = useState('');
  const [nr_of_stars, setNr_of_stars] = useState('');
  const [Price_before_discount, setPrice_before_discount] = useState('');
  const [Category, setCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getProductId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/edit/${Product_id}`);
        const product = response.data[0];
        // console.log('name'+ product.Name);
      
        setDescription(product.Description);
        setName(product.Name);
        setPrice(product.Price);
        setNr_in_stock(product.nr_in_stock);
        setNr_of_stars(product.nr_of_stars);
        setPrice_before_discount(product.Price_before_discount);
        setCategory(product.Category);
        setProduct(product);
      } catch (error) {
        console.error(error);
      }
    };

    getProductId();
  }, [Product_id]);

  const update =  (e) => {
    e.preventDefault();
    try {
       axios.put(`http://localhost:5000/products/update/${Product_id}`, {
        Description: Description,
        Name: Name,
        Price: Price,
        nr_in_stock: nr_in_stock,
        nr_of_stars:nr_of_stars,
        Price_before_discount:Price_before_discount,
        Category:Category
      });
      navigate('/admin-products');
    } catch (error) {
      console.error("Error gurl", error);
    }
  };

  return (
    <div>
      <div className="formaadd">
        <h2 className="h2add">Update product here!</h2>
        <form className="add-form">
          <input
            className="inputform"
            type="text"
            placeholder="Description"
            id="Emri"
            Emri="Emri"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Name"
            id="Surname"
            name="Surname"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Price"
            id="Phone"
            name="Phone"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Number in stock"
            id="price"
            name="price"
            value={nr_in_stock}
            onChange={(e) => setNr_in_stock(e.target.value)}
          />
          
          <input
            className="inputform"
            type="text"
            placeholder="Number of stars"
            id="price"
            name="price"
            value={nr_of_stars}
            onChange={(e) => setNr_of_stars(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Price before discount"
            id="price"
            name="price"
            value={Price_before_discount}
            onChange={(e) => setPrice_before_discount(e.target.value)}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Write category"
            id="price"
            name="price"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button className="updateproduct-btn" type="submit" onClick={update}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
