import { useContext, useRef, useState } from "react";
import Modal from "./Modal";
import { myContext } from "../../App";
import "./log.css";

function LoginModal() {
    const { isLoginOpen, setLoginOpen, setSignupOpen, setLoggedIn, setUser,accessToken,setAccessToken } = useContext(myContext);
    const userRef = useRef(null);
    const passRef = useRef(null);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

    const checkpw = async () => {
        const username = userRef.current.value.trim();
        const password = passRef.current.value.trim();
    
        // Regex for validation
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; 
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
        // Validate username and password
        if (!usernameRegex.test(username)) {
            setMessage("❌ Invalid username! Use 3-20 characters (letters, numbers, _).");
            return;
        }
    
        if (!passwordRegex.test(password)) {
            setMessage("❌ Invalid password! Must be 8+ characters, contain a letter, number, and special character.");
            return;
        }
    
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage("✅ Login Successful!");
                setUser(data.user);
                // Ensure accessToken is always a string
                const tokenString = typeof data.accessToken === 'string' ? data.accessToken : String(data.accessToken);
                setAccessToken(tokenString);
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userInfo', JSON.stringify(data.user));

                setTimeout(() => {
                    setLoggedIn(true);
                    setLoginOpen(false);
                    setMessage(null);
                }, 2000);
            } else {
                setMessage("❌ " + data.message);
                userRef.current.value = "";
                passRef.current.value = "";
            }
        } catch (error) {
            setMessage("❌ Network error. Please try again.");
            userRef.current.value = "";
            passRef.current.value = "";

        }
    };
    

    return (
        <Modal isOpen={isLoginOpen} closeModal={() => { setLoginOpen(false); setMessage(null); }}>
            <div className="modalContent">
                <h2>Login</h2>
                <input type="text" placeholder="Username" ref={userRef} />

                <div className="password-container">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        ref={passRef} 
                    />
                    <input 
                        type="checkbox" 
                        id="showPasswordLogin" 
                        checked={showPassword} 
                        onChange={() => setShowPassword(!showPassword)} 
                    />
                    <label htmlFor="showPasswordLogin">Show Password</label>
                </div>

                {message && <p className={message.includes("✅") ? "success" : "error"}>{message}</p>}
                
                <div className="options">
                    <button className="submit" onClick={checkpw}>Submit</button>
                    <button onClick={() => { setLoginOpen(false); setSignupOpen(true); setMessage(null); }}>Register Now</button>
                </div>
            </div>
        </Modal>
    );
}

export default LoginModal;
