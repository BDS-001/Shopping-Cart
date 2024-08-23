import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import '../styles/CartPage.css'

function Cart() {
    const { cart, cartCount, handleQuantityChange, handleRemoveFromCart } = useOutletContext();

    return (
        <>
        {cartCount < 1 ? (
                <div className="empty">
                <h1>
                    Your Cart is Empty! go to{' '}
                    <Link to="/">
                        <span style={{ color: 'lightblue' }}>
                            Shopping Page
                        </span>
                    </Link>
                    {' '}to get some items!
                </h1>
            </div> ) : (
                <>
                    <h1>Cart</h1>
                    {cart.map(item => (
                        <CartItem key={item.id} item={item} handleQuantityChange={handleQuantityChange} handleRemoveFromCart={handleRemoveFromCart} />
                    ))}
                </>
                    )}
        </>
    )
}

export default Cart