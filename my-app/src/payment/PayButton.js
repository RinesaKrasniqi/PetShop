import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const PayButton=({cartItems})=>{
    const userId = Cookies.get('Client_id');

    const handleCheckout =() => {
    axios.post('http://localhost:5000/stripe/create-checkout-session',{
        cartItems,
        userId:userId

        }).then((res)=>{
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        }).catch((err)=>console.log('errori 1:',err.message));
    };

    return (
      <>
          <button className="checkout-btn" onClick={() => handleCheckout()}>Purchase</button>
          <style>
              {`
                  .checkout-btn {
                      background-color: #c42636;
                      color: #fff;
                      padding: 10px 12px;
                      border: none;
                      border-radius: 5px;
                      cursor: pointer;
                      width: 150px;
                      margin-left: 43px;
                      margin-bottom: 5px;
                  }

                  /* Style the button on hover */
                  .checkout-btn:hover {
                      background-color: #5b0b15;
                  }
              `}
          </style>
      </>
  );
}


export default PayButton;
