import { NavLink } from 'react-router-dom';
import './header.css';
import { useContext } from 'react';
import { myContext } from '../../App';



function Header() {

    const {setLoginOpen,setSignupOpen,isLoggedIn,setLoggedIn}=useContext(myContext)
    
    return (
        <>
            <div className="head">
                <header>
                    <h1 className="logo">Store</h1>
                    {!isLoggedIn && 
                        (<div className="account">
                            <button type="button" className="accbtn signup" onClick={() => setSignupOpen(true)}>Sign up</button>
                            <button type="button" className="accbtn login" onClick={() => setLoginOpen(true)} >Login</button>
                        </div>)
                    }

                    {
                      isLoggedIn &&(<button type="button" className="accbtn login" onClick={() => setLoggedIn(false)} >Logout</button>)
                    }


                </header>
                <hr />
                <nav>
                    <ul className="nav-list">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "act" : "inact"}>Home</NavLink></li>
                        <li><NavLink to="/Book" className={({ isActive }) => isActive ? "act" : "inact"}>Book Now</NavLink></li>
                        <li><NavLink to="/Print" className={({ isActive }) => isActive ? "act" : "inact"}>Print Me</NavLink></li>

                        {isLoggedIn &&
                             (<li><NavLink to="/Profile" className={({ isActive }) => isActive ? "act" : "inact"}>Profile</NavLink></li>)
                        }
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Header;
