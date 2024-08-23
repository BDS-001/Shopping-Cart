import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import '../styles/CartPage.css'

function Cart() {
    const { cart, cartCount, handleQuantityChange, handleRemoveFromCart } = useOutletContext();
    let subtotal = 0
    if (cart.length > 0) subtotal = cart.reduce((total, item) => total + (item.productData.price * item.amount), 0)
    return (
        <>
        {cartCount < 1 ? (
                <div className="empty">
                <h1>
                    Your Cart is Empty! go to{' '}
                    <Link to="/shop">
                        <span style={{ color: 'lightblue' }}>
                            Shopping Page
                        </span>
                    </Link>
                    {' '}to get some items!
                </h1>
            </div> ) : (
                <>
                    <h1>Cart</h1>
                    <div className="cart-container">
                        <div className="cart-container-content">
                            {cart.map(item => (
                                <CartItem key={item.id} item={item} handleQuantityChange={handleQuantityChange} handleRemoveFromCart={handleRemoveFromCart} />
                            ))}
                            <div className="payment">
                                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                                <p>HST(13%): ${(subtotal * .13).toFixed(2)}</p>
                                <p>Total: ${(subtotal * 1.13).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </>
                    )}
        </>
    )
}

export default Cart