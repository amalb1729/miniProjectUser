import { useContext, useState } from "react";
import Modal from "./Modal";
import { myContext } from "../../App";
import "./log.css";

function SignupModal() {
    const { isSignupOpen, setSignupOpen, setLoginOpen } = useContext(myContext);

    const [step, setStep] = useState(1); // Step 1: Basic Info, Step 2: Additional Info
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

    // Step 1: Basic Info
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Step 2: Additional Info
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");

    // Validation messages
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Regex patterns
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    // Handlers for validation
    const validateUsername = (value) => {
        setUsername(value);
        setUsernameError(usernameRegex.test(value) ? "" : "❌ Must be 3-20 characters (letters, numbers, _)");
    };

    const validateEmail = (value) => {
        setEmail(value);
        setEmailError(emailRegex.test(value) ? "" : "❌ Invalid email format.");
    };

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError(passwordRegex.test(value) ? "" : "❌ 8+ characters, 1 letter, 1 number, 1 special character");
    };

    const registerUser = async () => {
        if (!username || !email || !password || !name || !department || !semester) {
            return setMessage("❌ Please fill in all fields.");
        }
        if (!usernameRegex.test(username) || !emailRegex.test(email) || !passwordRegex.test(password) || !nameRegex.test(name)) {
            return setMessage("❌ Fix errors before submitting.");
        }

        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, name, department, semester })
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("✅ Registration Successful!");
            setTimeout(() => {
                setSignupOpen(false);
                setLoginOpen(true);
                setMessage(null);
            }, 2000);
        } else {
            setMessage("❌ " + data.message);
        }
    };

    return (
        <Modal isOpen={isSignupOpen} closeModal={() => { setSignupOpen(false); setMessage(null); }}>
            <div className="modalContent">
                {step === 1 ? (
                    <>
                        <h2>Sign Up</h2>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => validateUsername(e.target.value)} />
                        {usernameError && <p className="error">{usernameError}</p>}

                        <input type="email" placeholder="Email" value={email} onChange={(e) => validateEmail(e.target.value)} />
                        {emailError && <p className="error">{emailError}</p>}

                        <div className="password-container">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => validatePassword(e.target.value)} 
                            />
                            <input 
                                type="checkbox" 
                                id="showPassword" 
                                checked={showPassword} 
                                onChange={() => setShowPassword(!showPassword)} 
                            />
                            <label htmlFor="showPassword">Show Password</label>
                        </div>
                        {passwordError && <p className="error">{passwordError}</p>}

                        <button className="next" onClick={() => setStep(2)} disabled={!usernameRegex.test(username) || !emailRegex.test(email) || !passwordRegex.test(password)}>
                         Next</button>

                    </>
                ) : (
                    <>
                        <h2>Additional Details</h2>
                        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                        {name && !nameRegex.test(name) && <p className="error">❌ Name should contain only letters and spaces.</p>}

                        {/* Department Dropdown */}
                        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                            <option value="">Select Department</option>
                            <option value="CSE">Computer Science</option>
                            <option value="ECE">Electronics</option>
                            <option value="EEE">Electrical</option>
                            <option value="MECH">Mechanical</option>
                            <option value="CIVIL">Civil</option>
                        </select>

                        {/* Semester Dropdown */}
                        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                            <option value="">Select Semester</option>
                            {[...Array(8)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}                       
                        </select>

                        {message && <p className={message.includes("✅") ? "success" : "error"}>{message}</p>}
                        <div className="options">
                            <button onClick={() => setStep(1)}>Back</button>
                            <button className="submit" onClick={registerUser}>Register</button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
}

export default SignupModal;
