import { Link } from "react-router-dom"

function ErrorPage() {
    return (
        <>
            <div>This Page does not exist, return to the <Link to={'/'}>Home Page</Link></div>
        </>
    )
}

export default ErrorPage