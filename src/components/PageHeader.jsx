import { Link } from "react-router-dom";
import '../styles/PageHeader.css'
import PropTypes from 'prop-types';

function PageHeader({cartCount}) {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="site-title">Shopping Site</h1>
                <nav>
                    <ul className="nav-list">
                        <li className="nav-item"><Link to="/">Homepage</Link></li>
                        <li className="nav-item"><Link to="/shop">Shop</Link></li>
                        <li className="nav-item"><Link to="/cart">Cart {cartCount < 1 ? null : <div className="item-count">{cartCount}</div> }</Link></li>
                        <li className="nav-item"><Link to="/gfgdfgdfsdfs">Test Error Page</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default PageHeader;

PageHeader.propTypes = {
    cartCount: PropTypes.number
}