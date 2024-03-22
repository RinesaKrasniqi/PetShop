import './addcss.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Add() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [nr_in_stock, setInStock] = useState("");
  const [nr_of_stars, setStars] = useState("");
  const [Price_before_discount, setDiscount] = useState("");
  const [foto, setFoto] = useState("");
  const [addStatus, setAddStatus] = useState("");
  const [CategoryNames, setCategoryNames] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/category');
        setCategoryNames(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoryNames();
  }, []);

  const add = async (e) => {
    e.preventDefault();
  
    const values = {
      Name,
      Description,
      Price,
      nr_in_stock,
      nr_of_stars,
      Price_before_discount, 
      foto,
      category_id: SelectedCategory // Assign SelectedCategory to category_id
    };
  
    try {
      const response = await axios.post("http://localhost:5000/insert", values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.message) {
        setAddStatus(response.data.message);
      } else {
        setAddStatus("Product inserted");
      }
  
      navigate('/admin-products');
    } catch (error) {
      console.error(error);
      setAddStatus("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchCategoryNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/category');
        setCategoryNames(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoryNames();
  }, []);

  return (
    <div>
      <div className="formaadd">
        <h2 className='h2add'>Add a product here!</h2>
        <form className="add-form" encType="multipart/form-data">
          <input
            className='inputform'
            type="text"
            placeholder="Add a Description"
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={Description}
          />
          <input
            className='inputform'
            type="text"
            placeholder="Enter Product Name"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={Name}
          />
         <select
  className="inputform"
  onChange={(e) => setSelectedCategory(e.target.value)}
  value={SelectedCategory}
>
  <option value="">Select a category</option>
  {CategoryNames.map((category) => (
    <option key={category.category_id} value={category.category_id}>
      {category.category_name}
    </option>
  ))}
</select>

          <input
            className="inputform"
            type="text"
            placeholder="Add Product Price"
            id="price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={Price}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Enter Price Before Discount"
            id="discount"
            name="discount"
            onChange={(e) => setDiscount(e.target.value)}
            value={Price_before_discount}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Enter Number In Stock"
            id="inStock"
            name="inStock"
            onChange={(e) => setInStock(e.target.value)}
            value={nr_in_stock}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Enter Number of stars"
            id="stars"
            name="stars"
            onChange={(e) => setStars(e.target.value)}
            value={nr_of_stars}
          />
          <input
            className="inputform"
            type="file"
            id="foto"
            name="foto"
            onChange={(e) => setFoto(e.target.files[0])}
          /> 
          <button className='add-btn' type="submit" onClick={add}>Add</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
