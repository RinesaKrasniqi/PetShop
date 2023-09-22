import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const PayButton = ({ cartItems }) => {
    //const userId = Cookies.get('Client_id');

    const handlePurchase = () => {
     try{
        axios.post(`http://localhost:5000/stripe/create-checkout-session`)
        // , {
           // cartItems,
           // client_id: userId
        // }).then((res) => {
            // if (res.data.url) {
                // window.location.href = res.data.url;
            // }
        // }).
            // }
    }catch(err){
        console.error(err.message)
    }
    //catch((err) => console.error(err.message));
    }

    return (
        <button onClick={handlePurchase}>Check out</button>
    );
}

export default PayButton;
