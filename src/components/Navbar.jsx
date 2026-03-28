import './Navbar.css'
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <div className="navbar" >
            <div className="logo">
                <Link to="/">BurgerBox</Link>
            </div>
            <div className="navbar-component">
                <ul>
                    <li>
                        <a href="#Home">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#menu">
                            Menu
                        </a>
                    </li>
                    <li>
                        <a href="#Offers">
                            Offers
                        </a>
                    </li>

                </ul>
            </div>

            <div className="navbar-component-2">
                <button className="cart">
                    cart
                </button>
                <Link to="/login">
                    <button className='login'>Login</button>
                </Link>
            </div>

        </div>
    );
}