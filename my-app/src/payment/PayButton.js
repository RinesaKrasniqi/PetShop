import axios from 'axios';
const frontendURL='http://localhost:3000/user-purchased';

const PayButton = ({ cartItems, frontendURL }) => {
    console.log("Product info",cartItems)
    const handlePurchase = () => {
        console.log("Cart Items in PayButton:",cartItems);
        axios.post('${frontendURL}/stripe/create-checkout-session', {
            cartItems
        })
    }

    return (
        <button onClick={handlePurchase}>Check out</button>

    );
}

export default PayButton;