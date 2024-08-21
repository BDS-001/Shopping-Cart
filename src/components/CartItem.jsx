import '../styles/CartItem.css';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
  const { amount, productData } = item;
  const { imageUrl, title, price } = productData;

  const handleQuantityChange = () => {
    // Empty function for now
  };

  const handleRemove = () => {
    // Empty function for now
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img src={imageUrl} alt={title} className="cart-item-image" />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{title}</h3>
        <div className="cart-item-quantity-section">
          <div className="cart-item-quantity">
            <button onClick={handleQuantityChange} className="quantity-button">-</button>
            <span>{amount}</span>
            <button onClick={handleQuantityChange} className="quantity-button">+</button>
          </div>
          <button onClick={handleRemove} className="remove-button">X</button>
        </div>
      </div>
      <div className="cart-item-price-container">
        <p className="cart-item-price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;

CartItem.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      amount: PropTypes.number.isRequired,
      productData: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        imageUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  };