import { NavLink } from 'react-router-dom';
import './header.css';
import { useContext } from 'react';
import { myContext } from '../../App';



function Header() {

    const {setLoginOpen,setSignupOpen,isLoggedIn,setLoggedIn,setUser}=useContext(myContext)
    
    const handleLogout = async () => {
        try {
            // Call the server's logout endpoint to clear the HTTP-only refreshToken cookie
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include' // Important for cookies
            });
            
            if (response.ok) {
                // Clear local storage/session storage
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('userInfo');
                // Update state
                setLoggedIn(false);
                setUser(null);
                console.log('Logged out successfully');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    
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
                      isLoggedIn &&(<button type="button" className="accbtn login" onClick={handleLogout} >Logout</button>)
                    }


                </header>
                <hr />
                <nav>
                    <ul className="nav-list">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "act" : "inact"}>Home</NavLink></li>
                        <li><NavLink to="/Book" className={({ isActive }) => isActive ? "act" : "inact"}>Book Now</NavLink></li>
                        {/* <li><NavLink to="/Print" className={({ isActive }) => isActive ? "act" : "inact" }>Print Me</NavLink></li> */}

                        {isLoggedIn &&
                            <>
                             <li><NavLink to="/Profile" className={({ isActive }) => isActive ? "act" : "inact"}>Profile</NavLink></li>
                             <li><NavLink to="/Cart" className={({ isActive }) => isActive ? "act" : "inact" }>Cart</NavLink></li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Header;
