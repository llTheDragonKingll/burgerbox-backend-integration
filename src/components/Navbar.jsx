import './Navbar.css'
export default function Navbar(){
    return(
        <div className="navbar" >
        <div className="logo">
            BurgerBox
        </div>
        <div className="navbar-component">
            <ul>
                <li>
                    Home
                </li>
                <li>
                    Menu
                </li>
                <li>
                    Offers
                </li>
                <li>
                    Contact
                </li>
            </ul>
        </div>

        <div className="navbar-component-2">
            <button className="cart">
                cart
            </button>
            <button className="login">
                login/sign in
            </button>
        </div>

        </div>
    );
}