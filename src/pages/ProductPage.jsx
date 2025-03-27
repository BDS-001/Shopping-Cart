import { useOutletContext, useParams, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/ProductPage.css";

export default function ProductPage() {
    const { product, handleAddToCart } = useOutletContext();
    const { name } = useParams();
    const [itemCount, setItemCount] = useState(1);

    const handleCountChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setItemCount(value >= 1 ? value : 1);
    };

    const addToCartHandler = () => {
        if (product) {
            const productData = {
                id: product.id,
                imageUrl: product.image,
                title: product.title,
                price: product.price,
            };
            handleAddToCart(itemCount, productData);
        }
    };

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product &quot;{name}&quot; not found</h2>
                <p>Sorry, we couldn&apos;t find the product you&apos;re looking for.</p>
                <Link to="/shop" className="back-to-shop">
                    Back to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="product-page">
            <div className="product-container">
                <div className="product-image-container">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="product-image" 
                    />
                </div>
                <div className="product-details">
                    <h1 className="product-title">{product.title}</h1>
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    
                    <div className="product-category">
                        <span className="category-label">Category:</span> 
                        <span className="category-value">{product.category}</span>
                    </div>
                    
                    <div className="product-rating">
                        <span className="rating-value">
                            {product.rating?.rate || "N/A"} ★
                        </span>
                        <span className="rating-count">
                            ({product.rating?.count || 0} reviews)
                        </span>
                    </div>
                    
                    <div className="product-description">
                        <h3>Product Description</h3>
                        <p>{product.description}</p>
                    </div>
                    
                    <div className="product-actions">
                        <div className="quantity-selector">
                            <label htmlFor="quantity">Quantity:</label>
                            <input 
                                type="number" 
                                id="quantity"
                                name="quantity" 
                                value={itemCount} 
                                min="1" 
                                onChange={handleCountChange} 
                            />
                        </div>
                        
                        <button 
                            className="add-to-cart-btn"
                            onClick={addToCartHandler}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}