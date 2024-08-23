import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart() {
    const { cart, handleQuantityChange } = useOutletContext();

    return (
        <>
        <h1>Cart</h1>
        {cart.map(item => (
            <CartItem key={item.id} item={item} handleQuantityChange={handleQuantityChange} />
        ))}
        </>
    )
}

export default Cart