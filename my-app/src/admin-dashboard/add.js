import { useRef, useState } from 'react';
import './addcss.css';
import Header from '../Components/header.js';
import { Link, useNavigate } from 'react-router-dom';
import AddValidation from './addvalidation';
import axios from 'axios';

export default function Add() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [nr_in_stock, setInStock] = useState("");
  const [nr_of_stars, setStars] = useState("");
  const [Price_before_discount, setDiscount] = useState("");
  const [Category, setCategory] = useState("");
  const [File, setFile] = useState("");
  const [addStatus, setAddStatus] = useState("");

  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();

    const values = {
      Name: Name,
      Description: Description,
      Price: Price,
      nr_in_stock: nr_in_stock,
      nr_of_stars: nr_of_stars,
      Price_before_discount: Price_before_discount,
      Category: Category,
      File:File
    };

    const errors = AddValidation(values);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:5000/insert", values);
        if (response.data.message) {
          setAddStatus(response.data.message);
        } else {
          setAddStatus("product inserted");
        }
        navigate('/admin-products');
      } catch (error) {
        console.error(error);
        setAddStatus("Something went wrong");
      }
    } else {
      setAddStatus(errors);
    }
  };

  return (
    <div>
      <div className="formaadd">
        <h2 className='h2add'>Add a product here!</h2>
        <form className="add-form">
          <input
            className='inputform'
            type="text"
            placeholder="Enter Product Name"
            id="name"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={Name}
          />
          <input
            className='inputform'
            type="text"
            placeholder="Add a Description"
            id="description"
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={Description}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Add Category"
            id="category"
            name="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={Category}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Add Product Price"
            id="price"
            name="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={Price}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Enter Price Before Discount"
            id="discount"
            name="discount"
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
            value={Price_before_discount}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Enter Number In Stock"
            id="inStock"
            name="inStock"
            onChange={(e) => {
              setInStock(e.target.value);
            }}
            value={nr_in_stock}
          />
          <input
            className="inputform"
            type="text"
            placeholder="Enter Number of stars"
            id="stars"
            name="stars"
            onChange={(e) => {
              setStars(e.target.value);
            }}
            value={nr_of_stars}
          />

           <input
            className="inputform"
            type="file"
            placeholder="Select a picture of the product"
            id="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.value);
            }}
            value={File}
          />
        </form>
        <button className='add-btn' type="submit" onClick={add}>Add</button>
      </div>
    </div>
  );
}
