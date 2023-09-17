import axios from 'axios';
import {useSelector} from 'react-redux';

const PayButton=({cartItems})=>{

    const handlePurchase=()=>{
        console.log(cartItems);


    }


    return (
        <button onClick={()=>handlePurchase}>Check out</button>

    );
}

export default PayButton;