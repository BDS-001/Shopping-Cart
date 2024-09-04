import { useOutletContext, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Card from "../components/ProductCard";
import '../styles/ShopPage.css'

function ShopPage() {
    const { products, handleAddToCart } = useOutletContext();
    const { name } = useParams();
    const product = name ? products.find(({title}) => title === name) : null

    return (
        <>
            <h1>Shop Page</h1>
            {!name && (
                <div className="catalogue">
                    {products.map(product => (
                        <Card 
                            key={product.id} 
                            id={product.id} 
                            imageUrl={product.image} 
                            title={product.title} 
                            description={product.description} 
                            price={product.price} 
                            handleAddToCart={handleAddToCart} 
                        />
                    ))}
                </div>
            )}
            <Outlet context={{ product, handleAddToCart }} />
        </>
    );
}

export default ShopPage