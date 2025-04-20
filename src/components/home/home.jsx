import "./Home.css";
import { useState, useEffect } from "react";

function Home(){
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch(`/api/announcement/active`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                setAnnouncements(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching announcements:", err);
                setError("Failed to load announcements");
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Combine all announcement texts with separators
    const announcementText = announcements.length > 0
        ? announcements.map(announcement => announcement.text).join(' | 🔹 ')
        : "No current announcements";

    return (
                <div className="home-container">
                {/* Hero Section */}
                <section className="hero">
                    <h1>Welcome to Store </h1>
                    <p>Your one-stop platform for booking academic materials and printing services.</p>
                </section>

                {/* Announcements Section */}
                <section className="announcements">
                    <h2>📢 Latest Announcements</h2>
                    {loading ? (
                        <p>Loading announcements...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="announcement-ticker">
                            <div className="announcement-text">
                                🔹 {announcementText}
                            </div>
                        </div>
                    )}
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
                        <h3>🔐 QR-Based Checkout</h3>
                        <p>Secure your purchases with QR authentication.</p>
                    </div>
                    <div className="feature-box">
                        <h3>👤 Profile & Order Tracking</h3>
                        <p>Manage your bookings and history.</p>
                    </div>
                    </div>
                </section>
                
                </div>
            );
    
}


export default Home