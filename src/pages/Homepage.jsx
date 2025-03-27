import { Link, useOutletContext } from 'react-router-dom';
import '../styles/Homepage.css';

function Homepage() {
    const { products } = useOutletContext();
    
    // Get 4 random products for featured section
    const featuredProducts = products.length > 0 
        ? [...products].sort(() => 0.5 - Math.random()).slice(0, 4)
        : [];
    
    // Extract unique categories
    const categories = products.length > 0
        ? [...new Set(products.map(product => product.category))]
        : [];

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Your Shopping Destination</h1>
                    <p>Discover amazing products with unbeatable prices</p>
                    <Link to="/shop" className="shop-now-btn">Shop Now</Link>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section">
                <h2>Featured Products</h2>
                <div className="featured-products">
                    {featuredProducts.map(product => (
                        <div className="featured-product" key={product.id}>
                            <div className="featured-image-container">
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className="featured-image" 
                                />
                            </div>
                            <h3>{product.title.length > 40 
                                ? product.title.substring(0, 40) + '...' 
                                : product.title}
                            </h3>
                            <p className="featured-price">${product.price.toFixed(2)}</p>
                            <Link 
                                to={`/shop/${product.title}`}
                                className="view-product-btn"
                            >
                                View Product
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <h2>Shop by Category</h2>
                <div className="categories-container">
                    {categories.map(category => (
                        <div className="category-card" key={category}>
                            <h3>{category}</h3>
                            <Link to="/shop" className="category-link">Browse</Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="newsletter-section">
                <div className="newsletter-content">
                    <h2>Stay Updated</h2>
                    <p>Subscribe to our newsletter for exclusive offers and updates</p>
                    <form className="newsletter-form">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            required 
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Homepage