import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const PayButton=({cartItems})=>{
    const userId = Cookies.get('Client_id');
    const handleCheckout = async () => {
      try {
        const formData = new FormData();
        formData.append('cartItems', JSON.stringify(cartItems));
  
      const response = await axios.post('http://localhost:5000/stripe/create-checkout-session', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
      <>
        <button onClick={handleCheckout}>Enroll</button>
      </>
    );
}

export default PayButton;
