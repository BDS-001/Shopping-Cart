import { useOutletContext } from "react-router-dom";
import Card from "../components/ProductCard";
import '../styles/ShopPage.css'

function ShopPage() {
    const { products, handleAddToCart } = useOutletContext();

    return (
        <>
            <h1>Shop Page</h1>
            <div className="catalogue">
                {products.map(product => (
                    <Card key={product.id} imageUrl={product.image} title={product.title} description={product.description} handleAddToCart={handleAddToCart} />
                ))}
            </div>
        </>
    )
}

export default ShopPage