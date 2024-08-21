import PropTypes from 'prop-types';
import { useState } from 'react';
import "../styles/ProductCard.css"

const handleCountChange = (e, setItemCount) => {
  const value = parseInt(e.target.value, 10);
  setItemCount(value >= 1 ? value : 1);
};

const Card = ({ id, imageUrl, title, description, price, handleAddToCart }) => {
  const [itemCount, setItemCount] = useState(1)
  const productData = {
    id,
    imageUrl,
    title,
    price,
  }

  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className='card-price'>${price}</h3>
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
      <div className="item-purchase">
        <input type="number" value={itemCount} min={1} onChange={(e) => handleCountChange(e, setItemCount)} />
        <button onClick={() => handleAddToCart(itemCount, productData)}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Card;


Card.propTypes = {
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    handleAddToCart: PropTypes.func
}