import { NavLink } from 'react-router-dom';
import './header.css';

function Header() {
    return (
        <>
            <div className="head">
                <header>
                    <h1 className="logo">Store</h1>
                    <div className="account">
                        <button type="button" className="accbtn signup">Sign up</button>
                        <button type="button" className="accbtn login">Login</button>
                    </div>
                </header>
                <hr />
                <nav>
                    <ul className="nav-list">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "act" : "inact"}>Home</NavLink></li>
                        <li><NavLink to="/Book" className={({ isActive }) => isActive ? "act" : "inact"}>Book Now</NavLink></li>
                        <li><NavLink to="/Print" className={({ isActive }) => isActive ? "act" : "inact"}>Print Me</NavLink></li>
                        <li><NavLink to="/Profile" className={({ isActive }) => isActive ? "act" : "inact"}>Profile</NavLink></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Header;
