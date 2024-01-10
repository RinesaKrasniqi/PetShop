// PayButton.js
import React from "react";
import axios from "axios";

const PayButton = ({ cartItems }) => {
    const handleCheckout = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/stripe/create-checkout-session',
                { cartItems },  // Send cartItems as a JSON payload
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  withCredentials: true,
                }
              );
        
              if (response.data.url) {
                window.location.href = response.data.url;
              }
            } catch (error) {
              console.log(error.message);
            }
          };
      
  return (
    <button onClick={handleCheckout}>Check Out</button>
  );
};

export default PayButton;
