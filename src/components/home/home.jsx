import "./Home.css";

function Home(){

            return (
                <div className="home-container">
                {/* Hero Section */}
                <section className="hero">
                    <h1>Welcome to Store </h1>
                    <p>Your one-stop platform for booking academic materials and printing services.</p>
                </section>

                {/* Features Section */}
                <section className="features">
                    <h2>What We Offer</h2>
                    <div className="features-grid">
                    <div className="feature-box">
                        <h3>📚 Book Materials Online</h3>
                        <p>Reserve academic books and notes with ease.</p>
                    </div>
                    <div className="feature-box">
                        <h3>🖨️ Easy Printing Services</h3>
                        <p>Upload files, set preferences, and get your prints quickly.</p>
                    </div>
                    <div className="feature-box">
                        <h3>🔐 QR-Based Checkout</h3>
                        <p>Secure your purchases with QR authentication.</p>
                    </div>
                    <div className="feature-box">
                        <h3>👤 Profile & Order Tracking</h3>
                        <p>Manage your bookings, uploads, and history.</p>
                    </div>
                    </div>
                </section>

                {/* Announcements Section */}
                <section className="announcements">
                    <h2>📢 Latest Announcements</h2>
                    <p>🔹 Book restock updates | 🔹 Service maintenance alerts</p>
                </section>

                </div>
            );
    
}


export default Home