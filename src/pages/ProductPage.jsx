import { useOutletContext } from "react-router-dom"

export default function ProductPage() {
    const { product } = useOutletContext();

    return (
        <>
            {!product ? (
                <>
                Product Does Not Exist
                </>
            ) :
            (
                <>
                Product Do exist
                </>
            )
            }
        </>
    )
}