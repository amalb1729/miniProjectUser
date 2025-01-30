
import { NavLink } from 'react-router-dom'
import './header.css'
function Header(){

    return(
        <>
        <div className="head"> 
            <header>
                <h1>Store</h1>
                <div className="account">
                    <button type="button" className="accbtn" id="signup">Sign up</button>
                    <button type="button" className="accbtn" id="login">Login</button>
                </div>
            </header>
            <hr></hr>
            <nav>
                <NavLink to="/" className={(e)=>{return e.isActive?"act":"inact"}} ><li>Home</li></NavLink >
                <NavLink to="/Book" className={(e)=>{return e.isActive?"act":"inact"}}><li>Book Now</li></NavLink >
                <NavLink to="/Print" className={(e)=>{return e.isActive?"act":"inact"}}><li>Print me</li></NavLink >
                <NavLink to="/Profile" className={(e)=>{return e.isActive?"act":"inact"}}><li>Profile</li></NavLink >
            </nav>
        </div>
        </>
    )
}

export default Header