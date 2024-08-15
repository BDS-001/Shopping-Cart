import { Link } from "react-router-dom"
import '../styles/ErrorPage.css'

function ErrorPage() {
    return (
        <>
            <div className="error"><h1>This Page does not exist, return to the <Link to={'/'}>Home Page</Link></h1></div>
        </>
    )
}

export default ErrorPage