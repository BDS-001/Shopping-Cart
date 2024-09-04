import { useOutletContext, useParams } from "react-router-dom"

export default function ProductPage() {
    const { product, handleAddToCart } = useOutletContext();
    const { name } = useParams();

    return (
        <>
            {!product ? (
                <>
                { name } is not a product
                </>
            ) :
            (
                <>
                {product.title} is a product
                </>
            )
            }
        </>
    )
}