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
        <button onClick={()=>handleCheckout()}>Purchase</button>
      </>
    );
}

export default PayButton;
