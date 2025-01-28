

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
                <a>Home</a>
                <a>Book Now</a>
                <a>Print me</a>
                <a>Profile</a>
            </nav>
        </div>
        </>
    )
}

export default Header