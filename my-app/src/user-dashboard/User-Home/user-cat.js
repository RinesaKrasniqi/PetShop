import {useRef, useState, useEffect} from 'react';
import { FaRegStar } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import {motion} from "framer-motion";
import  UserHeader from './user-header.js';
import  Footer from '../../Components/footer.js';
import axios from 'axios';
var Link = require('react-router-dom').Link

function UserCat(){
   const [pro,setPro]=useState([]);
   const [Product_id, setProduct_id] = useState("");
   const [Name, setName] = useState("");
   const [Description, setDescription] = useState("");
   const [Price, setPrice] = useState("");
   const [nr_in_stock, setInStock] = useState("");
   const [nr_of_stars, setStars] = useState("");
   const [Price_before_discount, setDiscount] = useState("");
   const [Category, setCategory] = useState("");


   const LoadCat=async()=>{
      const response= await axios.get('http://localhost:5000/product/cat');
      console.log(response.data);
      setPro(response.data)
    }

    
    const handleAddToCart = async (productId) => {
      const selectedProduct = pro.find((product) => product.Product_id === productId);
    
      if (selectedProduct) {
        const data = {
          Product_id: selectedProduct.Product_id,
          Name: selectedProduct.Name,
          Description: selectedProduct.Description,
          Price: selectedProduct.Price,
          nr_in_stock: selectedProduct.nr_in_stock,
          nr_of_stars: selectedProduct.nr_of_stars,
          Price_before_discount: selectedProduct.Price_before_discount,
          Category: selectedProduct.Category,
        };
    
        try {
          await axios.post('http://localhost:5000/cart', data);
          window.alert('Product added to cart successfully!');
        } catch (error) {
          console.error('Error adding product to cart:', error);
        }
      }
    };
  
    useEffect(()=>{
      LoadCat();
    },[]);


    return(
      <div>
         <div>
            <UserHeader/>
         </div>

         <div className='product-container'>
    {pro.map((product,index)=>(
         <div key={product.Product_id} className='card-back'>

         <div class="card" >
        <div class='fotoja-div'>
        <Link to='/shop'><img class='fotoja' src="./Img/cat-bag.jpg" ></img></Link>
        </div>

       <div class="caption">

        <p class="rate">
           <i class="FaRegStar"><FaStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
           <i class="FaRegStar"><FaRegStar color="gold" fill="gold" size='18px'/></i>
        </p>

        <h3 class='product_name' value={Name} onChange={(e) => setName(e.target.value)}>Product name: {product.Name}</h3>
             <p class="price"  value={Price} onChange={(e) => setPrice(e.target.value)}>{product.Price}$</p>
             <p class='discount'  value={Price_before_discount} onChange={(e) =>  setDiscount(e.target.value)}>number of discount:  {product.Price_before_discount}$</p>
             <p class='product_name' value={Description} onChange={(e) =>  setDescription(e.target.value)}>description:  {product.Description}</p>
             <p class='in stock' value={nr_in_stock} onChange={(e) =>  setStars(e.target.value)}>number in stock: {product.nr_in_stock}</p>   

       </div>
       <div class='products-button'>
       <motion.button class='purchase'whileHover={{scale:1.1}} >Purchase</motion.button>
       <motion.button class='add' whileHover={{scale:1.1}}  onClick={() => handleAddToCart(product.Product_id)}><i class="FaCartPlus"><FaCartPlus  size={'20px'}/></i></motion.button>
       </div>
       </div>
      </div> 
 ))}
  </div>
       <div>
      <Footer/>
   </div>
    </div>
    );
}

export default UserCat;
