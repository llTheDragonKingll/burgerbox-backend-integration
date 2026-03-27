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
            <button className="login">
                login/sign in
            </button>
        </div>

        </div>
    );
}